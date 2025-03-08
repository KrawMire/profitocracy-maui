using Profitocracy.Core.Domain.Model.Transactions.ValueObjects;

namespace Profitocracy.Core.Specifications;

/// <summary>
/// Represents the specification for filtering
/// transactions based on various criteria
/// </summary>
public record struct TransactionsSpecification
{
    public Guid? ProfileId { get; init; }
    public Guid? CategoryId { get; init; }
    public SpendingType? SpendingType { get; init; }
    public DateTime? FromDate { get; init; }
    public DateTime? ToDate { get; init; }
    public TransactionDestination? Destination { get; init; }
    public bool? IsMultiCurrency { get; init; }
}