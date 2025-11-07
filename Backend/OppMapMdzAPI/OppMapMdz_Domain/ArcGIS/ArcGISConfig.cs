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

        [JsonProperty("zonificacionUsosSuelosLayer")]
        public string ZonificacionUsosSuelosLayer { get; set; }
    }
}
