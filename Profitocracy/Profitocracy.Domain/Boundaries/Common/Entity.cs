namespace Profitocracy.Domain.Boundaries.Common;

public abstract class Entity<T>
{
	public Entity(T id)
	{
		Id = id;
	}
	
	public T Id { get; }
}