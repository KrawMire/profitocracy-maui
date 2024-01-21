namespace Profitocracy.Domain.Boundaries.Common;

public abstract class Entity<T>
{
	public required T Id { get; set; }
}