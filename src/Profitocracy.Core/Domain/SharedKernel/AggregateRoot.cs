namespace Profitocracy.Core.Domain.SharedKernel;

public abstract class AggregateRoot<T> : Entity<T>
{
	public AggregateRoot(T id) : base(id) { }
}