using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>>{}

        public class Handler : IRequestHandler<Query, List<Activity>> //We send a query and get back a list of type activity
        {
            private readonly DataContext _context;
           

            public Handler(DataContext context) //Injecting our database context dependency
            {
              
                _context = context;
            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                return await _context.Activities.ToListAsync(); //Return list of activities
            }
        }
    }
}