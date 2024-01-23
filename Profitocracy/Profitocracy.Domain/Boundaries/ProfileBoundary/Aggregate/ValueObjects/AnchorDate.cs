namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.ValueObjects;

public struct AnchorDate
{
	public required DateTime Timestamp { get; set; }
	public required decimal InitialBalance { get; set; }
}