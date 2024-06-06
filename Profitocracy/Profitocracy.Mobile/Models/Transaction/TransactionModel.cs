namespace Profitocracy.Mobile.Models.Transaction;

public class TransactionModel
{
    private readonly string[] _spendingTypes =
    [
        "Main",
        "Secondary",
        "Saved",
        "Income"
    ];
    
    public Guid? Id { get; set; }
    public required decimal Amount { get; set; }
    public required Guid ProfileId { get; set; }
    public required int Type { get; set; }
    public required int? SpendingType { get; set; }
    public required DateTime Timestamp { get; set; }
    public TransactionCategoryModel? Category { get; set; }
    public string? Description { get; set; }

    public bool IsIncome => SpendingType is null or -1;
    
    public string DisplaySpendingType => IsIncome ? _spendingTypes[3] : _spendingTypes[(int)SpendingType!];

    public string DisplayAmount
    {
        get
        {
            if (Type == 0)
            {
                return $"+{Amount}";
            }

            return $"-{Amount}";
        }
    }
}