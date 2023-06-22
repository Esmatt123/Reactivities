using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity {get; set;}
        }

         public class CommandValidator : AbstractValidator<Command>{
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
                
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id); //find the entity with the particular id

                if (activity == null) return null;

                _mapper.Map(request.Activity, activity); //update anything if the text box is not null

                var result = await _context.SaveChangesAsync() > 0; //Save changes

                if(!result) return Result<Unit>.Failure("Failed to update the activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}