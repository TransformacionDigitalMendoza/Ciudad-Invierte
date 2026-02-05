using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Domain.ArcGIS
{
    public class GeometryBufferResponse
    {
        public List<ArcGisGeometryPolygon> Geometries { get; set; } = new();
    }
}
