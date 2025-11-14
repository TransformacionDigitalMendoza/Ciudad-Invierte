using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OppMapMdz_Domain.ArcGIS.Zonificacion;

namespace OppMapMdzAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class VersionController : ControllerBase
    {
        [HttpGet("Version")]
        public async Task<IActionResult> Version()
        {
            try
            {
                return Ok(new { 
                    MachineName = Environment.MachineName, 
                    Version = "0.1" 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
