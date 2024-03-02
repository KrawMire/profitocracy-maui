using Profitocracy.Domain.Boundaries.Common;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.Entities;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.ValueObjects;

namespace Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;

public class Transaction : AggregateRoot<Guid>
{
	public Transaction(
		Guid id,
		decimal amount,
		Guid profileId,
		TransactionType type,
		SpendingType? spendingType,
		DateTime timestamp,
		string? description,
		TransactionGeoTag? geoTag,
		TransactionCategory? category): base(id)
	{
		Amount = amount;
		ProfileId = profileId;
		Timestamp = timestamp;
		Description = description;
		GeoTag = geoTag;
		Category = category;

		if (type == TransactionType.Expense && spendingType is null)
		{
			throw new Exception("If transaction is expense then spendingType should be specified");
		}

		Type = type;
		SpendingType = spendingType;
	}
	
	public decimal Amount { get; set; }
	public Guid ProfileId { get; set; }
	public TransactionType Type { get; set; }
	public SpendingType? SpendingType { get; set; }
	public DateTime Timestamp { get; set; }
	public string? Description { get; set; }
	public TransactionGeoTag? GeoTag { get; set; }
	public TransactionCategory? Category { get; set; }
}