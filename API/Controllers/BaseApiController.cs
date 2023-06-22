using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= 
        HttpContext.RequestServices.GetService<IMediator>(); 
        //Executes mediator, and if a certain namespace doesnt have mediator, get it

        protected ActionResult HandleResult<T>(Result<T> result){
            if(result == null) return NotFound();
             if(result.IsSuccess && result.Value != null)
            return Ok(result.Value);
             if(result.IsSuccess && result.Value == null)
             return NotFound();
             return BadRequest(result.Error);
        }
    }

    

}