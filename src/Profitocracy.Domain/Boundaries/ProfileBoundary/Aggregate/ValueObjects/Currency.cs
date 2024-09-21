namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.ValueObjects;

public class Currency
{
	public required string Name { get; set; }
	public required string Code { get; set; }
	public required string Symbol { get; set; }
}