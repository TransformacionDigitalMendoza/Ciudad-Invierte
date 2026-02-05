using OppMapMdz_Domain.ArcGIS;
using OppMapMdz_Domain.ArcGIS.Comercio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Application.Interfaces.Repositories
{
    public interface IComercioRepository
    {
        Task<ComerciosBufferResult> GetComerciosBufferAsync(ArcGisGeometryPoint center, double distance);
    }
}
