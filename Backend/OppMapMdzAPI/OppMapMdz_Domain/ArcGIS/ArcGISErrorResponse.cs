using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Domain.ArcGIS
{
    public class ArcGISErrorResponse
    {
        [JsonProperty("error")]
        public Error? Error { get; set; }
    }

    public class Error
    {
        [JsonProperty("code")]
        public long Code { get; set; }

        [JsonProperty("message")]
        public string? Message { get; set; }

        [JsonProperty("details")]
        public List<object>? Details { get; set; }
    }
}