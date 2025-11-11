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
                    var query = HttpUtility.ParseQueryString(uriBuilder.Query);

                    // Agrego parámetros base
                    foreach (var param in parametros)
                        query[param.Key] = param.Value;

                    // Parámetros de paginación
                    query["resultOffset"] = offset.ToString();
                    query["resultRecordCount"] = pageSize.ToString();
                    query["f"] = "json"; // por si no está
                    uriBuilder.Query = query.ToString();

                    var requestMessage = new HttpRequestMessage(HttpMethod.Get, uriBuilder.Uri);

                    using var response = await httpClient.SendAsync(requestMessage, HttpCompletionOption.ResponseHeadersRead);
                    response.EnsureSuccessStatusCode();

                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    IsArcGISErrorResponse(content, endpoint);

                    var contentData = JsonConvert.DeserializeObject<JObject>(content);
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

        private void IsArcGISErrorResponse(string content, string endpoint)
        {
            var error = JsonConvert.DeserializeObject<ArcGISErrorResponse>(content);
            if (error.Error != null)
            {
                throw new Exception($"[ArcGISAPIRepository - GetFeaturesAsync] Error al consultar servicio: {endpoint}\nResponse: {content}");
            }
        }
    }
}
