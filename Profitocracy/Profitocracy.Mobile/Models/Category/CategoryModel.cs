using Profitocracy.Mobile.Resources.Strings;

namespace Profitocracy.Mobile.Models.Category;

public class CategoryModel
{
    public Guid? Id { get; set; }
    public required Guid ProfileId { get; set; } 
    public required string Name { get; set; }
    public decimal? PlannedAmount { get; set; }

    public string? DisplayPlannedAmount 
        => PlannedAmount is not null ? PlannedAmount.ToString() : AppResources.NoLimits;
}