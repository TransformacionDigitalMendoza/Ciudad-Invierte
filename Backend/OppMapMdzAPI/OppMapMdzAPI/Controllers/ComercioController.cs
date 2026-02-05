using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OppMapMdz_Application.Interfaces.Services;
using OppMapMdz_Domain.ArcGIS;
using OppMapMdz_Domain.ArcGIS.Comercio;
using OppMapMdz_Domain.ArcGIS.Zonificacion;

namespace OppMapMdzAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComercioController : ControllerBase
    {
        private readonly IComercioSrv _comercioSrv;

        public ComercioController(IComercioSrv comercioSrv)
        {
            _comercioSrv = comercioSrv;
        }

        [HttpGet("GetComerciosBuffer")]
        public async Task<IActionResult> GetComerciosBuffer(ComercioBufferRequest request)
        {
            try
            {
                ComerciosBufferResult comerciosBufferResult = await _comercioSrv.GetComerciosBufferAsync(request.center, request.distance);

                return Ok(comerciosBufferResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
