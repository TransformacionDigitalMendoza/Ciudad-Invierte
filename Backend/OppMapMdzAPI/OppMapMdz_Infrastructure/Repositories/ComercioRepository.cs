using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using OppMapMdz_Application.Interfaces.Repositories;
using OppMapMdz_Application.Interfaces.Services;
using OppMapMdz_Domain.ArcGIS;
using OppMapMdz_Domain.ArcGIS.Comercio;
using OppMapMdz_Domain.ArcGIS.Zonificacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace OppMapMdz_Infrastructure.Repositories
{
    public class ComercioRepository : IComercioRepository
    {
        private readonly IArcGISApiSrv _arcGISApiSrv;
        private readonly IConfiguration _configuration;
        private readonly ArcGISConfig _arcGISConfig;

        public ComercioRepository(IArcGISApiSrv apiSrv, IConfiguration configuration, IOptions<ArcGISConfig> options)
        {
            _arcGISApiSrv = apiSrv;
            _configuration = configuration;
            _arcGISConfig = options.Value;
        }

        public async Task<ComerciosBufferResult> GetComerciosBufferAsync(ArcGisGeometryPoint center, double distance)
        {
            // Buffer 
            var buffer = await _arcGISApiSrv.BufferAsync(new GeometryBufferRequest
            {
                Distance = distance,
                Geometries = new List<ArcGisGeometryPoint>() { center },
                Geodesic = true
            });

            // Comercios
            List<KeyValuePair<string, string>> parametros = new List<KeyValuePair<string, string>>();
            parametros.Add(new KeyValuePair<string, string>("where", "1=1"));
            parametros.Add(new KeyValuePair<string, string>("geometryType", "esriGeometryPolygon"));
            parametros.Add(new KeyValuePair<string, string>("geometry", JsonConvert.SerializeObject(buffer.Geometries[0])));
            parametros.Add(new KeyValuePair<string, string>("inSR", "4326"));
            parametros.Add(new KeyValuePair<string, string>("spatialRel", "esriSpatialRelContains"));
            parametros.Add(new KeyValuePair<string, string>("outSR", "4326"));
            parametros.Add(new KeyValuePair<string, string>("outfields", "*"));
            parametros.Add(new KeyValuePair<string, string>("returnGeometry", "true"));
            parametros.Add(new KeyValuePair<string, string>("f", "pjson"));

            List<ArcGISGetComercio> comercios = await _arcGISApiSrv.GetFeaturesAsync<ArcGISGetComercio>(_arcGISConfig.ComercioLayer, parametros);

            return new ComerciosBufferResult() { buffer = buffer, comercios = comercios };
        }
    }
}
