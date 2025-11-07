using OppMapMdz_Domain.ArcGIS.Zonificacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Application.Interfaces.Repositories
{
    public interface IZonificacionRepository
    {
        Task<List<ArcGISGetZonificacionUsosSuelo>> GetZonificacionUsosSuelos(bool returnGeometry = false);
    }
}
