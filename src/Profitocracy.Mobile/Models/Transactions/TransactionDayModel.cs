using Profitocracy.Mobile.Utils;

namespace Profitocracy.Mobile.Models.Transactions;

/// <summary>
/// Transactions of one day, shown as a single card in the activity list.
/// </summary>
public class TransactionDayModel
{
    public required DateTime Date { get; init; }
    public required List<TransactionModel> Transactions { get; init; }
    public required string Total { get; init; }

    public string DayName => DateUtils.DayName(Date);
    public string ShortDate => Date.ToString("dd.MM");
}
