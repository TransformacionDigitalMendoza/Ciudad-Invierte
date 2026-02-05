using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Domain.ArcGIS
{
    public class ArcGISConfig
    {
        [JsonProperty("baseUrl")]
        public string BaseUrl { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("referer")]
        public string Referer { get; set; }

        [JsonProperty("generateTokenUrl")]
        public string GenerateTokenUrl { get; set; }

        [JsonProperty("zonificacionUsosSuelosLayer")]
        public string ZonificacionUsosSuelosLayer { get; set; }

        [JsonProperty("comercioLayer")]
        public string ComercioLayer { get; set; }

        [JsonProperty("bufferSrvUrl")]
        public string BufferSrvUrl { get; set; }
    }
}
