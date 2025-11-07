using OppMapMdz_Application.Interfaces.Repositories;
using OppMapMdz_Application.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Infrastructure.Services
{
    public class ArcGISApiSrv : IArcGISApiSrv
    {
        private readonly IArcGISAPIRepository _repository;

        public ArcGISApiSrv(IArcGISAPIRepository repository)
        {
            _repository = repository;
        }

        public async Task<T> GetFeaturesAsync<T>(string endpoint, List<KeyValuePair<string, string>> parametros)
        {
            return await _repository.GetFeaturesAsync<T>(endpoint, parametros);
        }
    }
}
