using Profitocracy.Domain.Boundaries.Common;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.Entities;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.ValueObjects;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.ValueObjects;

namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;

/// <summary>
/// Profile aggregate root.
/// Contains data about settings of profile, balances
/// state and methods for calculation of transactions
/// </summary>
public class Profile : AggregateRoot<Guid>
{
	public Profile(
		Guid id,
		string name,
		AnchorDate startDate,
		decimal balance,
		decimal savedBalance,
		List<ProfileCategory> categoriesBalances,
		ProfileSettings settings,
		ProfileExpenses expenses,
		bool isCurrent) : base(id)
	{
		Name = name;
		Balance = balance;
		SavedBalance = savedBalance;
		CategoriesBalances = categoriesBalances;
		Settings = settings;
		IsCurrent = isCurrent;
		Expenses = expenses;
		
		var currentDate = DateTime.Now;

		if (startDate.Timestamp.Month != currentDate.Month)
		{
			startDate.Timestamp = new DateTime(currentDate.Year, currentDate.Month, 1);
		}
		
		StartDate = startDate;
	}
	
	/// <summary>
	/// Name of profile
	/// </summary>
	public string Name { get; set; }
	
	/// <summary>
	/// Anchor date of start of financial period (1 month)
	/// </summary>
	public AnchorDate StartDate { get; set; }
	
	/// <summary>
	/// Current balance
	/// </summary>
	public decimal Balance { get; set; }
	
	/// <summary>
	/// Total saved amount
	/// </summary>
	public decimal SavedBalance { get; set; }
	
	/// <summary>
	/// Calculations of expenses by types: main, secondary and saved
	/// </summary>
	public ProfileExpenses Expenses { get; private set; }
	
	/// <summary>
	/// Result of expenses calculations for every category
	/// </summary>
	public List<ProfileCategory> CategoriesBalances { get; set; }
	
	/// <summary>
	/// Profile settings
	/// </summary>
	public ProfileSettings Settings { get; set; }

	/// <summary>
	/// Is this profile currently using by user
	/// </summary>
	public bool IsCurrent { get; set; }

	/// <summary>
	/// Process transaction and
	/// project results in profile
	/// </summary>
	/// <param name="transaction">Transaction to handle</param>
	public void HandleTransaction(Transaction transaction)
	{
		if (transaction.Type == TransactionType.Income)
		{
			HandleIncomeTransaction(transaction);
		}
		else
		{
			HandleExpenseTransaction(transaction);
		}
	}
	
	private void HandleIncomeTransaction(Transaction transaction)
	{
		Balance += transaction.Amount;
		Expenses.TotalBalance.PlannedAmount = Balance;
	}

	private void HandleExpenseTransaction(Transaction transaction)
	{
		Balance -= transaction.Amount;

		if (transaction.Timestamp.Day == DateTime.Now.Day)
		{
			Expenses.DailyFromInitialBalance.ActualAmount += transaction.Amount;
			Expenses.DailyFromActualBalance.ActualAmount += transaction.Amount;
		}
		
		switch (transaction.SpendingType)
		{
			case SpendingType.Main:
				HandleMainSpendingTransaction(transaction);
				break;
			case SpendingType.Secondary:
				HandleSecondarySpendingTransaction(transaction);
				break;
			case SpendingType.Saved:
				HandleSavingSpendingTransaction(transaction);
				break;
			default:
				throw new ArgumentOutOfRangeException(nameof(transaction.SpendingType));
		}

		if (transaction.Category is not null)
		{
			HandleCategoryTransaction(transaction);
		}
	}

	private void HandleMainSpendingTransaction(Transaction transaction)
	{
		Expenses.Main.ActualAmount += transaction.Amount;
	}
	
	private void HandleSecondarySpendingTransaction(Transaction transaction)
	{
		Expenses.Secondary.ActualAmount += transaction.Amount;
	}
	
	private void HandleSavingSpendingTransaction(Transaction transaction)
	{
		Expenses.Saved.ActualAmount = transaction.Amount;
	}

	private void HandleCategoryTransaction(Transaction transaction)
	{
		var category = CategoriesBalances.Find(c => c.Id.Equals(transaction.Category!.Id));

		if (category is null)
		{
			return;
		}

		category.ActualAmount += transaction.Amount;
	}
}