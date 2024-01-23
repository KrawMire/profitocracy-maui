namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.ValueObjects;

public struct ProfileExpense
{
	public required string Name { get; set; }
	public required decimal ActualAmount { get; set; }
	public required decimal PlannedAmount { get; set; }
}