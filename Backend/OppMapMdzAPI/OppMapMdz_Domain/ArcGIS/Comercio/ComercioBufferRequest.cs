using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Domain.ArcGIS.Comercio
{
    public class ComercioBufferRequest
    {
        public ArcGisGeometryPoint center { get; set; }
        public double distance { get; set; }
    }
}
