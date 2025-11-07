using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using OppMapMdz_Application.Interfaces.Repositories;
using OppMapMdz_Application.Interfaces.Services;
using OppMapMdz_Domain.ArcGIS;
using OppMapMdz_Domain.ArcGIS.Zonificacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Infrastructure.Repositories
{
    public class ZonificacionRepository : IZonificacionRepository
    {
        private readonly IArcGISApiSrv _arcGISApiSrv;
        private readonly IConfiguration _configuration;
        private readonly ArcGISConfig _arcGISConfig;

        public ZonificacionRepository(IArcGISApiSrv apiSrv, IConfiguration configuration, IOptions<ArcGISConfig> options)
        {
            _arcGISApiSrv = apiSrv;
            _configuration = configuration;
            _arcGISConfig = options.Value;
        }

        public async Task<List<ArcGISGetZonificacionUsosSuelo>> GetZonificacionUsosSuelos(bool returnGeometry = false)
        {
            List<KeyValuePair<string,string>> parametros = new List<KeyValuePair<string,string>>();
            parametros.Add(new KeyValuePair<string, string>("where", "1=1"));
            parametros.Add(new KeyValuePair<string, string>("outfields", "*"));
            parametros.Add(new KeyValuePair<string, string>("returnGeometry", returnGeometry ? "true" : "false"));
            parametros.Add(new KeyValuePair<string, string>("f", "pjson"));

            return await _arcGISApiSrv.GetFeaturesAsync<List<ArcGISGetZonificacionUsosSuelo>>(_arcGISConfig.ZonificacionUsosSuelosLayer, parametros);
        }
    }
}
