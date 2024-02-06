namespace Profitocracy.Mobile.Models.Profile;

public class CategoryExpenseModel
{
    public Guid CategoryId { get; set; }
    public required string Name { get; set; }
    public required decimal ActualAmount { get; set; }
    public decimal? PlannedAmount { get; set; }
}