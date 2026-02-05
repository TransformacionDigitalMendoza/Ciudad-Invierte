using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Domain.ArcGIS.Comercio
{
    public class ComerciosBufferResult
    {
        public GeometryBufferResponse buffer { get; set; }

        public List<ArcGISGetComercio> comercios { get; set; }
    }
}
