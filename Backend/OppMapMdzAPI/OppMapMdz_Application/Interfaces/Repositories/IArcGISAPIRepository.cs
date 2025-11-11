using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Application.Interfaces.Repositories
{
    public interface IArcGISAPIRepository
    {
        Task<List<T>> GetFeaturesAsync<T>(string endpoint, List<KeyValuePair<string, string>> parametros);
    }
}
