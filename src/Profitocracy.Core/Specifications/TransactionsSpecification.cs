using Profitocracy.Core.Domain.Model.Transactions.ValueObjects;

namespace Profitocracy.Core.Specifications;

public record TransactionsSpecification
{
    public Guid? CategoryId { get; init; }
    public SpendingType? SpendingType { get; init; }
    public DateTime? FromDate { get; init; } = null;
    public DateTime? ToDate { get; init; } = null;
}