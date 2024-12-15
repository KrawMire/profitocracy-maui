namespace Profitocracy.Core.Domain.Model.Profiles.ValueObjects;

/// <summary>
/// Set of profile expenses.
/// Contains types (main, secondary, saved) and daily amounts
/// </summary>
public class ProfileExpenses
{
	/// <summary>
	/// Total amount of expenses
	/// </summary>
	public required ProfileExpense TotalBalance { get; init; }
	
	/// <summary>
	/// Daily amounts from actual profile balance
	/// </summary>
	public required ProfileExpense DailyFromActualBalance { get; init; }
	
	/// <summary>
	/// Daily amounts from initial profile balance
	/// </summary>
	public required ProfileExpense DailyFromInitialBalance { get; init; }
	
	/// <summary>
	/// Main expenses amount
	/// </summary>
	public required ProfileExpense Main { get; init; }
	
	/// <summary>
	/// Secondary expenses amount
	/// </summary>
	public required ProfileExpense Secondary { get; init; }
	
	/// <summary>
	/// Saved amount
	/// </summary>
	public required ProfileExpense Saved { get; init; }
}