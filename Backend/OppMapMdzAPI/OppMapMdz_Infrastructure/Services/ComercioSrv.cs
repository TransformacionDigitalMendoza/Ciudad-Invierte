using OppMapMdz_Application.Interfaces.Repositories;
using OppMapMdz_Application.Interfaces.Services;
using OppMapMdz_Domain.ArcGIS;
using OppMapMdz_Domain.ArcGIS.Comercio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Infrastructure.Services
{
    public class ComercioSrv : IComercioSrv
    {
        private readonly IComercioRepository _repository;

        public ComercioSrv(IComercioRepository repository)
        {
            _repository = repository;
        }

        public async Task<ComerciosBufferResult> GetComerciosBufferAsync(ArcGisGeometryPoint center, double distance)
        {
            return await _repository.GetComerciosBufferAsync(center, distance);
        }
    }
}
