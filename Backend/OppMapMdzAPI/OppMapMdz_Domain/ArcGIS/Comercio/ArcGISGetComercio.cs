using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Domain.ArcGIS.Comercio
{
    public class ArcGISGetComercio
    {
        [JsonProperty("attributes", NullValueHandling = NullValueHandling.Ignore)]
        public AttributesComercio Attributes { get; set; }

        [JsonProperty("geometry", NullValueHandling = NullValueHandling.Ignore)]
        public ArcGisGeometryPoint Geometry { get; set; }
    }

    public class AttributesComercio
    {
        [JsonProperty("objectid", NullValueHandling = NullValueHandling.Ignore)]
        public long? Objectid { get; set; }

        [JsonProperty("status", NullValueHandling = NullValueHandling.Ignore)]
        public string Status { get; set; }

        [JsonProperty("comercio_id", NullValueHandling = NullValueHandling.Ignore)]
        public string ComercioId { get; set; }

        [JsonProperty("nombre_fantasia", NullValueHandling = NullValueHandling.Ignore)]
        public string NombreFantasia { get; set; }

        [JsonProperty("baja_fecha")]
        public long? BajaFecha { get; set; }

        [JsonProperty("calle", NullValueHandling = NullValueHandling.Ignore)]
        public string Calle { get; set; }

        [JsonProperty("numero", NullValueHandling = NullValueHandling.Ignore)]
        public double Numero { get; set; }

        [JsonProperty("numero_extension")]
        public string NumeroExtension { get; set; }

        [JsonProperty("piso")]
        public string Piso { get; set; }

        [JsonProperty("depto")]
        public string Depto { get; set; }

        [JsonProperty("local")]
        public string Local { get; set; }

        [JsonProperty("domicilio_extension")]
        public string DomicilioExtension { get; set; }

        [JsonProperty("padron_asociado", NullValueHandling = NullValueHandling.Ignore)]
        public string PadronAsociado { get; set; }

        [JsonProperty("estado_cuenta", NullValueHandling = NullValueHandling.Ignore)]
        public string EstadoCuenta { get; set; }

        [JsonProperty("fecha_referencia", NullValueHandling = NullValueHandling.Ignore)]
        public long? FechaReferencia { get; set; }

        [JsonProperty("conteo_dias", NullValueHandling = NullValueHandling.Ignore)]
        public double ConteoDias { get; set; }

        [JsonProperty("fecha_inicio_cuenta", NullValueHandling = NullValueHandling.Ignore)]
        public long? FechaInicioCuenta { get; set; }
    }
}
