namespace Profitocracy.Domain.Boundaries.Common;

public abstract class Entity<T>
{
	public T Id { get; set; }
}