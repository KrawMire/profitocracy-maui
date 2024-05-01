namespace Profitocracy.Domain.Boundaries.Common;

public abstract class AggregateRoot<T> : Entity<T>
{
	public AggregateRoot(T id) : base(id) { }
}