using OppMapMdz_Domain.ArcGIS.Zonificacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Application.Interfaces.Services
{
    public interface IZonificacionSrv
    {
        Task<List<ArcGISGetZonificacionUsosSuelo>> GetPadronZonaAsync();
        Task<List<ArcGISGetZonificacionUsosSuelo>> GetPadronZonaFilterAsync(long? objectId, string padron, bool returnGeometry = false);
        Task<List<ArcGISGetZonificacionUsosSuelo>> GetZonificacionUsosSuelos(bool returnGeometry = false);
    }
}
