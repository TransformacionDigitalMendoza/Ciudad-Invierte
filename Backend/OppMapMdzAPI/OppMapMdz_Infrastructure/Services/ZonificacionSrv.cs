using OppMapMdz_Application.Interfaces.Repositories;
using OppMapMdz_Application.Interfaces.Services;
using OppMapMdz_Domain.ArcGIS.Zonificacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Infrastructure.Services
{
    public class ZonificacionSrv : IZonificacionSrv
    {
        private readonly IZonificacionRepository _repository;

        public ZonificacionSrv(IZonificacionRepository zonificacionRepository)
        {
            _repository = zonificacionRepository;
        }
        public async Task<List<ArcGISGetZonificacionUsosSuelo>> GetZonificacionUsosSuelos(bool returnGeometry = false)
        {
            return await _repository.GetZonificacionUsosSuelos(returnGeometry);
        }
    }
}
