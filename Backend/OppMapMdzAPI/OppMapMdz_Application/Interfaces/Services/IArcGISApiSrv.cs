using OppMapMdz_Domain.ArcGIS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Application.Interfaces.Services
{
    public interface IArcGISApiSrv
    {
        Task<List<T>> GetFeaturesAsync<T>(string endpoint, List<KeyValuePair<string, string>> parametros);
        Task<GeometryBufferResponse> BufferAsync(GeometryBufferRequest request);
    }
}
