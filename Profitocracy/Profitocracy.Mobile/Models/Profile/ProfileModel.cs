namespace Profitocracy.Mobile.Models.Profile;

public class ProfileModel
{
    public Guid? Id { get; set; }
    public required string Name { get; set; }
    public required DateTime StartDate { get; set; }
    public required decimal InitialBalance { get; set; }
    public DateTime BillingDateFrom { get; set; }
    public DateTime BillingDateTo { get; set; }
    public decimal Balance { get; set; }
    public decimal SavedBalance { get; set; }
    
    public ProfileExpensesModel? Expenses { get; set; }
    public List<CategoryExpenseModel>? CategoriesBalances { get; set; }
    
    public CurrencyModel? Currency { get; set; }
    public bool IsCurrent { get; set; }
}