namespace Profitocracy.Domain.Boundaries.Common;

public abstract class Entity<T>(T id)
{
	public T Id { get; set; } = id;
}