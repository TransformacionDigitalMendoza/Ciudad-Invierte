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
        public async Task<T> GetFeaturesAsync<T>(string endpoint, List<KeyValuePair<string, string>> parametros)
        {
            var httpClient = _httpClient.CreateClient("ArcGIS");

            string content = null;
            try
            {
                var uriBuilder = new UriBuilder($"{_arcGISConfig.BaseUrl}{endpoint}/query");
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);

                foreach (var param in parametros)
                {
                    query[param.Key] = param.Value;
                }

                uriBuilder.Query = query.ToString();
                var requestMessage = new HttpRequestMessage(HttpMethod.Get, uriBuilder.Uri);

                using var response = await httpClient.SendAsync(requestMessage, HttpCompletionOption.ResponseHeadersRead);

                response.EnsureSuccessStatusCode();

                if (response.IsSuccessStatusCode) 
                {
                    content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    IsArcGISErrorResponse(content, endpoint);
                }

                var contentData = JsonConvert.DeserializeObject(content);
                
                var data =((JObject)contentData).SelectToken("features").ToObject<T>();

                return data;

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
