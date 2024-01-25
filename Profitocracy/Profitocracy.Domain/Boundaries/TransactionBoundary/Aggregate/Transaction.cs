using Profitocracy.Domain.Boundaries.Common;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.Entities;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.ValueObjects;

namespace Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;

public class Transaction(Guid id) : AggregateRoot<Guid>(id)
{
	public required decimal Amount { get; set; }
	public required Guid ProfileId { get; set; }
	public required TransactionType Type { get; set; }
	public required SpendingType SpendingType { get; set; }
	public required DateTime Timestamp { get; set; }
	public string? Description { get; set; }
	public TransactionGeoTag? GeoTag { get; set; }
	public TransactionCategory? Category { get; set; }
}