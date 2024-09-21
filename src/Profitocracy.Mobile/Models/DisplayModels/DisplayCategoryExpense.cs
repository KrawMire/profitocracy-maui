namespace Profitocracy.Mobile.Models.DisplayModels;

public record DisplayCategoryExpense(
    string Name,
    decimal ActualAmount,
    bool IsShowRatio,
    decimal? PlannedAmount,
    float? Ratio)
{
    public bool IsNotShowRatio => !IsShowRatio;
};