using Profitocracy.Mobile.Resources.Strings;

namespace Profitocracy.Mobile.Models.Transactions;

public class TransactionModel
{
    private readonly string[] _spendingTypes =
    [
        AppResources.Main,
        AppResources.Secondary,
        AppResources.Saved,
        AppResources.Income
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

    public static TransactionModel FromDomain(Core.Domain.Model.Transactions.Transaction transaction)
    {
        TransactionCategoryModel? category = null;

        if (transaction.Category is not null)
        {
            category = new TransactionCategoryModel
            {
                CategoryId = transaction.Category.Id,
                Name = transaction.Category.Name
            };
        }
		
        return new TransactionModel
        {
            Id = transaction.Id,
            Amount = transaction.Amount,
            ProfileId = transaction.ProfileId,
            Type = (int)transaction.Type,
            SpendingType = transaction.SpendingType is null ? null : (int)transaction.SpendingType,
            Description = transaction.Description,
            Timestamp = transaction.Timestamp,
            Category = category
        };
    }
}