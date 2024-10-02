using Profitocracy.Core.Domain.Model.Transactions.ValueObjects;

namespace Profitocracy.Core.Specifications;

public record TransactionsSpecification
{
    public Guid? ProfileId { get; init; }
    public Guid? CategoryId { get; init; }
    public SpendingType? SpendingType { get; init; }
    public DateTime? FromDate { get; init; }
    public DateTime? ToDate { get; init; }
}