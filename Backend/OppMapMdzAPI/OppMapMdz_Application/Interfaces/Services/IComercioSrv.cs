using OppMapMdz_Domain.ArcGIS;
using OppMapMdz_Domain.ArcGIS.Comercio;
using OppMapMdz_Domain.ArcGIS.Zonificacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Application.Interfaces.Services
{
    public interface IComercioSrv
    {
        Task<ComerciosBufferResult> GetComerciosBufferAsync(ArcGisGeometryPoint center, double distance);
    }
}
