using Profitocracy.Domain.Boundaries.Common;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.Entities;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.ValueObjects;

namespace Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;

public class Transaction(Guid id) : AggregateRoot<Guid>(id)
{
	private TransactionType _type;
	private SpendingType _spendingType;
	public required decimal Amount { get; set; }
	public required Guid ProfileId { get; set; }

	public required TransactionType Type
	{
		get => _type;

		set
		{
			if (!Enum.IsDefined(typeof(TransactionType), value))
			{
				throw new Exception("Invalid value for transaction type");
			}
			
			_type = value;
		}
	}

	public required SpendingType SpendingType
	{
		get => _spendingType;
		set
		{
			if (!Enum.IsDefined(typeof(SpendingType), value))
			{
				throw new Exception("Invalid value for spending type");
			}
			
			_spendingType = value;
		}
	}

	public required DateTime Timestamp { get; set; }
	public string? Description { get; set; }
	public TransactionGeoTag? GeoTag { get; set; }
	public TransactionCategory? Category { get; set; }
}