using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Domain.ArcGIS
{
    public class ArcGisGeometryPolygon
    {
        public List<List<List<double>>> Rings { get; set; } = new();
        public SpatialReference SpatialReference { get; set; }
    }
}
