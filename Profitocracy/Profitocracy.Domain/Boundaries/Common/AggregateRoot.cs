namespace Profitocracy.Domain.Boundaries.Common;

public abstract class AggregateRoot<T>(T id) : Entity<T>(id)
{
	
}