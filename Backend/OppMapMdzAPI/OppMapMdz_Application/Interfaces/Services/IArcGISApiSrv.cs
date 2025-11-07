using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Application.Interfaces.Services
{
    public interface IArcGISApiSrv
    {
        Task<T> GetFeaturesAsync<T>(string endpoint, List<KeyValuePair<string, string>> parametros);
    }
}
