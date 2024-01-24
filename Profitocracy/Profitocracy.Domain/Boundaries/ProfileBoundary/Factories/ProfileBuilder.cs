using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.Entities;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.ValueObjects;

namespace Profitocracy.Domain.Boundaries.ProfileBoundary.Factories;

public class ProfileBuilder(Guid profileId)
{
	private Guid _id = profileId;
	private decimal _balance = 0;
	private decimal _savedBalance = 0;
	private string _name = "Default";
	private bool _isCurrent = true;
		
	private readonly List<ProfileCategory> _categories = [];
	
	
	private AnchorDate? _startDate;
	private ProfileSettings? _settings;
	
	public void AddBalance(decimal balance)
	{
		_balance = balance;
	}

	public void AddSavedBalance(decimal savedBalance)
	{
		_savedBalance = savedBalance;
	}
	
	public void AddName(string name)
	{
		_name = name;
	}

	public void AddStartDate(DateTime date, decimal balance)
	{
		_startDate = new AnchorDate
		{
			Timestamp = date,
			InitialBalance = balance
		};
	}

	public void AddCategoryExpense(Guid id, string name, decimal? plannedAmount = null)
	{
		_categories.Add(new ProfileCategory(id)
		{
			Name = name,
			ActualAmount = 0,
			PlannedAmount = plannedAmount
		});
	}

	public void AddCurrency(string code, string name, string symbol)
	{
		_settings = new ProfileSettings
		{
			Currency = new Currency
			{
				Code = code,
				Name = name,
				Symbol = symbol
			}
		};
	}

	public void AddIsCurrent(bool isCurrent)
	{
		_isCurrent = isCurrent;
	}

	public Profile Build()
	{
		if (_startDate is null)
		{
			AddStartDate(DateTime.Now, _balance);	
		}

		if (_settings is null)
		{
			AddCurrency("USD", "US Dollar", "$");
		}

		var expenses = CreateProfileExpenses();

		return new Profile(
			_id,
			_name,
			(AnchorDate)_startDate!,
			_balance,
			_savedBalance,
			_categories,
			(ProfileSettings)_settings!,
			expenses,
			_isCurrent);
	}

	private ProfileExpenses CreateProfileExpenses()
	{
		var currentDate = DateTime.Now;
		var startDate = (AnchorDate)_startDate!;

		var daysInPeriod = currentDate.Day - startDate.Timestamp.Day;

		return new ProfileExpenses
		{
			DailyFromActualBalance = new ProfileExpense
			{
				ActualAmount = 0,
				PlannedAmount = _balance / daysInPeriod
			},
			DailyFromInitialBalance = new ProfileExpense
			{
				ActualAmount = 0,
				PlannedAmount = startDate.InitialBalance / daysInPeriod
			},
			Main = new ProfileExpense
			{
				ActualAmount = 0,
				PlannedAmount = startDate.InitialBalance * 0.5m
			},
			Secondary = new ProfileExpense
			{
				ActualAmount = 0,
				PlannedAmount = startDate.InitialBalance * 0.3m
			},
			Saved = new ProfileExpense
			{
				ActualAmount = 0,
				PlannedAmount = startDate.InitialBalance * 0.2m
			},
			TotalBalance = new ProfileExpense
			{
				ActualAmount = 0,
				PlannedAmount = startDate.InitialBalance
			}
		};
	}
}