using OppMapMdz_Application.Interfaces.Repositories;
using System.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OppMapMdz_Domain.ArcGIS;
using Microsoft.Extensions.Options;
using System.Net;
using System.Globalization;
using System.Text.Json;

namespace OppMapMdz_Infrastructure.Repositories
{
    public class ArcGISApiRepository : IArcGISAPIRepository
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;
        private ArcGISConfig _arcGISConfig;

        public ArcGISApiRepository(IHttpClientFactory httpClient, IConfiguration configuration, IOptions<ArcGISConfig> options)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _arcGISConfig = options.Value;
        }

        public async Task<ArcGISToken> GenerateTokenAsync()
        {
            var httpClient = _httpClient.CreateClient("ArcGIS");

            try
            {
                var uriBuilder = new UriBuilder($"{_arcGISConfig.GenerateTokenUrl}");
                var parameters = new[] {
                        new KeyValuePair<string, string>("username", _arcGISConfig.Username),
                        new KeyValuePair<string, string>("password", _arcGISConfig.Password),
                        new KeyValuePair<string, string>("referer", _arcGISConfig.Referer),
                        new KeyValuePair<string, string>("expiration","5"),
                        new KeyValuePair<string, string>("f","pjson")
                    };

                var requestMessage = new HttpRequestMessage
                {
                    RequestUri = uriBuilder.Uri,
                    Method = HttpMethod.Post,
                    Content = new FormUrlEncodedContent(parameters)
                };

                using var response = await httpClient.SendAsync(requestMessage, HttpCompletionOption.ResponseContentRead);
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

                var contentData = JsonConvert.DeserializeObject<JObject>(content);

                IsArcGISErrorResponse(contentData, uriBuilder.Uri.ToString());

                var features = contentData.ToObject<ArcGISToken>() ?? new ArcGISToken();

                return features;
            }
            catch (Exception ex)
            {
                throw new Exception("[ArcGISAPIRepository - GenerateTokenAsync]", ex);
            }
        }

        public async Task<List<T>> GetFeaturesAsync<T>(string endpoint, List<KeyValuePair<string, string>> parametros)
        {
            var httpClient = _httpClient.CreateClient("ArcGIS");
            var allFeatures = new List<T>();
            int offset = 0;
            int pageSize = 1000; // ajustá según el servicio

            try
            {
                bool more = true;

                while (more)
                {
                    var uriBuilder = new UriBuilder($"{_arcGISConfig.BaseUrl}{endpoint}/query");

                    var requestParams = new List<KeyValuePair<string, string>>(parametros)
                    {
                        new("resultOffset", offset.ToString()),
                        new("resultRecordCount", pageSize.ToString())
                    };

                    var requestMessage = new HttpRequestMessage
                    {
                        RequestUri = uriBuilder.Uri,
                        Method = HttpMethod.Post,
                        Content = new FormUrlEncodedContent(requestParams)
                    };

                    using var response = await httpClient.SendAsync(requestMessage, HttpCompletionOption.ResponseHeadersRead);
                    response.EnsureSuccessStatusCode();

                    //var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

                    await using var stream = await response.Content.ReadAsStreamAsync();
                    using var sr = new StreamReader(stream);
                    using var reader = new JsonTextReader(sr);

                    var serializer = new Newtonsoft.Json.JsonSerializer();
                    var contentData = serializer.Deserialize<JObject>(reader);

                    IsArcGISErrorResponse(contentData, endpoint);

                    //var contentData = JsonConvert.DeserializeObject<JObject>(content);
                    var features = contentData.SelectToken("features")?.ToObject<List<T>>() ?? new List<T>();

                    allFeatures.AddRange(features);

                    // Verificar si hay más datos
                    bool exceededTransferLimit = contentData.SelectToken("exceededTransferLimit")?.Value<bool>() ?? false;

                    if (exceededTransferLimit && features.Count > 0)
                    {
                        offset += features.Count;
                    }
                    else
                    {
                        more = false;
                    }
                }

                return allFeatures;
            }
            catch (Exception ex)
            {
                throw new Exception("[ArcGISAPIRepository - GetFeaturesAsync]", ex);
            }
        }

        public async Task<GeometryBufferResponse> BufferAsync(GeometryBufferRequest request)
        {
            // Obtener token
            var token = await GenerateTokenAsync();
            if (string.IsNullOrWhiteSpace(token.token))
                throw new InvalidOperationException("ArcGIS token inválido");

            var payload = new Dictionary<string, string>
            {
                ["f"] = "json",
                ["geometries"] = System.Text.Json.JsonSerializer.Serialize(new
                {
                    geometryType = "esriGeometryPoint",
                    geometries = request.Geometries.Select(g => new
                    {
                        x = g.X,
                        y = g.Y
                    })
                }),
                ["inSR"] = "4326",
                ["bufferSR"] = "32719",
                ["outSR"] = "4326",
                ["distances"] = request.Distance.ToString(CultureInfo.InvariantCulture),
                ["units"] = request.Units,
                ["unionResults"] = request.UnionResults.ToString().ToLower(),
                ["geodesic"] = request.Geodesic.ToString().ToLower(),
                ["token"] = token.token
            };

            if (request.OutSR.HasValue)
                payload["outSR"] = request.OutSR.Value.ToString();

            var httpClient = _httpClient.CreateClient("ArcGIS");

            var response = await httpClient.PostAsync(
                $"{_arcGISConfig.BaseUrl}{_arcGISConfig.BufferSrvUrl}",
                new FormUrlEncodedContent(payload));

            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();

            return System.Text.Json.JsonSerializer.Deserialize<GeometryBufferResponse>(
                json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            )!;
        }

        private void IsArcGISErrorResponse(JObject content, string endpoint)
        {
            if (content["error"] != null)
            {
                throw new Exception($"[ArcGISAPIRepository - GetFeaturesAsync] Error al consultar servicio: {endpoint}\nResponse: {content}");
            }
        }
    }
}
