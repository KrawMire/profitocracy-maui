namespace Profitocracy.Mobile.Models.Profile;

public class ProfileExpensesModel
{
    public required ProfileExpenseModel TotalBalance { get; set; }
    public required ProfileExpenseModel DailyFromActualBalance { get; set; }
    public required ProfileExpenseModel DailyFromInitialBalance { get; set; }
    public required ProfileExpenseModel Main { get; set; }
    public required ProfileExpenseModel Secondary { get; set; }
    public required ProfileExpenseModel Saved { get; set; }
}