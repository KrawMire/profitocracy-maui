namespace Profitocracy.Mobile.Models.Categories;

public record CategoryExpenseModel(
    Guid Id,
    string Name,
    decimal ActualAmount,
    bool IsShowRatio,
    decimal? PlannedAmount,
    float? Ratio)
{
    public bool IsNotShowRatio => !IsShowRatio;
};