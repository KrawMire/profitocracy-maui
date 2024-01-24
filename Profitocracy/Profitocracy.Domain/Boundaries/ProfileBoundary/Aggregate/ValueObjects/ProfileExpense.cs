namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.ValueObjects;

public class ProfileExpense
{
	public required decimal ActualAmount { get; set; }
	public required decimal PlannedAmount { get; set; }
}