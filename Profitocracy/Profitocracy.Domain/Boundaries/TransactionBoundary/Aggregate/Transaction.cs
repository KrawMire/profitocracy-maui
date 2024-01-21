using Profitocracy.Domain.Boundaries.Common;

namespace Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;

public class Transaction : AggregateRoot<Guid>
{
	public decimal Amount { get; set; }
}