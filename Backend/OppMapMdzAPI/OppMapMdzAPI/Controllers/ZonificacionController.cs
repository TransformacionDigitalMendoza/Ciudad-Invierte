using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Writers;
using OppMapMdz_Application.Interfaces.Services;
using OppMapMdz_Domain.ArcGIS.Zonificacion;

namespace OppMapMdzAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZonificacionController : ControllerBase
    {
        private readonly IZonificacionSrv _zonificacionSrv;

        public ZonificacionController(IZonificacionSrv zonificacionSrv)
        {
            _zonificacionSrv = zonificacionSrv;
        }

        [HttpGet("GetUsosSuelo")]
        public async Task<IActionResult> GetZonas(bool returnGeometry=false)
        {
            try
            {
                List<ArcGISGetZonificacionUsosSuelo> listZonificacion = await _zonificacionSrv.GetZonificacionUsosSuelos(returnGeometry);

                return Ok(listZonificacion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
