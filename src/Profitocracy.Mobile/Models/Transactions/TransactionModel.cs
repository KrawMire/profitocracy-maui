using System.Globalization;
using Profitocracy.Core.Domain.Model.Transactions;
using Profitocracy.Mobile.Resources.Strings;

namespace Profitocracy.Mobile.Models.Transactions;

public class TransactionModel
{
    private readonly string[] _spendingTypes =
    [
        AppResources.Transactions_Main,
        AppResources.Transactions_Secondary,
        AppResources.Transactions_Saved,
        AppResources.Transactions_Income
    ];
    
    public Guid? Id { get; set; }
    public bool IsMultiCurrency { get; set; }
    public required decimal Amount { get; set; }
    public decimal? DestinationAmount { get; set; }
    public string? DestinationCurrency { get; set; }
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
            var amount = IsMultiCurrency 
                ? DestinationCurrency + ((decimal)DestinationAmount!).ToString(CultureInfo.CurrentCulture) 
                : Amount.ToString(CultureInfo.CurrentCulture);
            
            return Type == 0 
                ? $"+{amount}" 
                : $"-{amount}";
        }
    }

    public string AdditionalDisplayAmount
    {
        get
        {
            if (!IsMultiCurrency)
            {
                return string.Empty;
            }

            var amount = Amount.ToString(CultureInfo.CurrentCulture);
            
            return Type == 0 
                ? $"+{amount.ToString(CultureInfo.CurrentCulture)}" 
                : $"-{amount.ToString(CultureInfo.CurrentCulture)}";
        }
    }

    public static TransactionModel FromDomain(Transaction transaction)
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
        
        var multiTransaction = transaction as MultiCurrencyTransaction;
        var isMultiCurrency = multiTransaction is not null;
        
        return new TransactionModel
        {
            Id = transaction.Id,
            Amount = transaction.Amount,
            IsMultiCurrency = isMultiCurrency,
            DestinationAmount = isMultiCurrency ? multiTransaction!.DestinationAmount : null,
            DestinationCurrency = isMultiCurrency ? multiTransaction!.DestinationCurrency.Symbol : null,
            ProfileId = transaction.ProfileId,
            Type = (int)transaction.Type,
            SpendingType = transaction.SpendingType is null ? null : (int)transaction.SpendingType,
            Description = transaction.Description,
            Timestamp = transaction.Timestamp,
            Category = category
        };
    }
}