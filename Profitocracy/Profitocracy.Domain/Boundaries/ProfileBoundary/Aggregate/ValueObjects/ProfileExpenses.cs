namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.ValueObjects;

public class ProfileExpenses
{
	public required ProfileExpense Main { get; set; }
	public required ProfileExpense Secondary { get; set; }
	public required ProfileExpense Saved { get; set; }
}