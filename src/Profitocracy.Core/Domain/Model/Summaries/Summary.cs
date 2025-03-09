using Profitocracy.Core.Domain.Model.Categories;
using Profitocracy.Core.Domain.Model.Shared.ValueObjects;
using Profitocracy.Core.Domain.Model.Summaries.ValueObjects;
using Profitocracy.Core.Domain.Model.Transactions;
using Profitocracy.Core.Domain.Model.Transactions.ValueObjects;
using Profitocracy.Core.Domain.SharedKernel;

namespace Profitocracy.Core.Domain.Model.Summaries;

public class Summary : AggregateRoot<Guid>
{
    private readonly ICollection<Transaction> _transactions;
    private readonly IDictionary<Guid, Category> _categories;
    private readonly int _daysInPeriod;
    private readonly int _weeksInPeriod;
    private readonly SummaryCalculationType _calcType;
    
    internal Summary(
        ICollection<Transaction> transactions,
        ICollection<Category> categories,
        SummaryCalculationType calcType,
        DateTime dateFrom,
        DateTime dateTo) : base(Guid.NewGuid())
    {
        if (dateFrom >= dateTo)
        {
            throw new ArgumentException("Date from must be less than date to.");
        }
        
        _transactions = transactions;
        
        var period = dateTo - dateFrom;
        var monthsPeriod = dateTo.Month - dateFrom.Month;

        _daysInPeriod = period.Days;
        _weeksInPeriod = period.Days / 7;
        _calcType = monthsPeriod <= 1 
            ? SummaryCalculationType.ForMonth
            : monthsPeriod <= 3
            ? SummaryCalculationType.ForThreeMonths
            : SummaryCalculationType.ForSixMonths;
        
        DailyAverage = 0;
        TotalIncome = 0;
        TotalExpenses = 0;
        
        CategoryExpenseExpectations = new Dictionary<Guid, CategoryExpenseExpectation>();
        CategoryExpenses = new Dictionary<Guid, CategoryExpense>();
        SpendingTypesExpenses = new Dictionary<SpendingType, decimal>
        {
            { SpendingType.Main, 0 },
            { SpendingType.Secondary, 0 },
            { SpendingType.Saved, 0 }
        };
        
        _categories = new Dictionary<Guid, Category>();

        foreach (var category in categories)
        {
            _categories.Add(category.Id, category);
            CategoryExpenses.Add(category.Id, new CategoryExpense(category.Name));
            
            if (category.PlannedAmount is not null)
            {
                CategoryExpenseExpectations.Add(category.Id, new CategoryExpenseExpectation(category.Name, category.PlannedAmount.Value));   
            }
        }
    }

    public decimal TotalIncome { get; private set; }
    public decimal TotalExpenses { get; private set; }
    public decimal DailyAverage { get; private set; }
    public Dictionary<Guid, CategoryExpenseExpectation> CategoryExpenseExpectations { get; }
    public Dictionary<Guid, CategoryExpense> CategoryExpenses { get; }
    public Dictionary<SpendingType, decimal> SpendingTypesExpenses { get; }
    
    public ICollection<WeeklyExpense>? WeeklyExpenses { get; set; }
    public ICollection<DailyExpense>? DailyExpenses { get; set; }
    
    public void CalculateSummary()
    {
        if (_calcType == SummaryCalculationType.ForMonth)
        {
            DailyExpenses = new List<DailyExpense>();
        }
        else
        {
            WeeklyExpenses = new List<WeeklyExpense>();
        }

        foreach (var transaction in _transactions)
        {
            HandleTransaction(transaction);
        }
    }

    private void HandleTransaction(Transaction transaction)
    {
        if (transaction.Type == TransactionType.Income)
        {
            TotalIncome += transaction.Amount;
            return;
        }
        
        if (transaction.Category is not null)
        {
            HandleCategoryTransaction(transaction);
        }
        
        HandleExpenseTransaction(transaction);
        DailyAverage = TotalExpenses / _daysInPeriod;
    }
    
    private void HandleCategoryTransaction(Transaction transaction)
    {
        CategoryExpenses[transaction.Category!.Id].Amount += transaction.Amount;

        if (_categories[transaction.Category.Id].PlannedAmount is not null)
        {
            CategoryExpenseExpectations[transaction.Category!.Id].ActualAmount += transaction.Amount;
        }
    }

    private void HandleExpenseTransaction(Transaction transaction)
    {
        TotalExpenses += transaction.Amount;

        if (transaction.SpendingType is null)
        {
            throw new ArgumentNullException(nameof(transaction), "Spending type of expense transaction is null");
        }

        SpendingTypesExpenses[transaction.SpendingType.Value] += transaction.Amount;
    }
}