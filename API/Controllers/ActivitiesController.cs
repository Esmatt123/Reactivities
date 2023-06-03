using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        
        private readonly IMediator _mediator;
       
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
            
            
        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query()); //Invokes Query to get list of activities
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){
            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid Id, Activity activity)
        {
            activity.Id = Id; //Identify Id by whats written in the text box
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity})); //Returns 200Ok if successful and edits the entity

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
           
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}