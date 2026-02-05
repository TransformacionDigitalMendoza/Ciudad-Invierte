using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Domain.ArcGIS
{
    public class GeometryBufferRequest
    {
        // Obligatorio
        public List<ArcGisGeometryPoint> Geometries { get; set; } = new();
        public double Distance { get; set; }

        // Opcionales
        public string Units { get; set; } = "esriMeters";
        public int? InSR { get; set; }
        public int? OutSR { get; set; }

        public bool UnionResults { get; set; } = false;
        public bool Geodesic { get; set; } = false;

        // Avanzados
        public string? BufferSpatialReference { get; set; }
        public string? DatumTransformation { get; set; }
    }
}
