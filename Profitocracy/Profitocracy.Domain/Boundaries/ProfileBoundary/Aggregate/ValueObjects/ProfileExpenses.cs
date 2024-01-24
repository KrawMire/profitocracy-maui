namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.ValueObjects;

/// <summary>
/// Set of profile expenses.
/// Contains types (main, secondary, saved) and daily amounts
/// </summary>
public class ProfileExpenses
{
	/// <summary>
	/// Total amount of expenses
	/// </summary>
	public required ProfileExpense TotalBalance { get; set; }
	
	/// <summary>
	/// Daily amounts from actual profile balance
	/// </summary>
	public required ProfileExpense DailyFromActualBalance { get; set; }
	
	/// <summary>
	/// Daily amounts from initial profile balance
	/// </summary>
	public required ProfileExpense DailyFromInitialBalance { get; set; }
	
	/// <summary>
	/// Main expenses amount
	/// </summary>
	public required ProfileExpense Main { get; set; }
	
	/// <summary>
	/// Secondary expenses amount
	/// </summary>
	public required ProfileExpense Secondary { get; set; }
	
	/// <summary>
	/// Saved amount
	/// </summary>
	public required ProfileExpense Saved { get; set; }
}