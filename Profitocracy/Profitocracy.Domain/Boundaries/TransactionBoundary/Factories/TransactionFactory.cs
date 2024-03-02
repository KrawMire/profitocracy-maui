using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.Entities;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.ValueObjects;

namespace Profitocracy.Domain.Boundaries.TransactionBoundary.Factories;

public class TransactionFactory
{
	public static Transaction CreateTransaction(
		Guid? id,
		decimal amount,
		Guid profileId,
		TransactionType type,
		SpendingType? spendingType,
		DateTime timestamp,
		string? description,
		TransactionGeoTag? geoTag,
		TransactionCategory? category)
	{
		id ??= Guid.NewGuid();

		return new Transaction(
			(Guid)id,
			amount,
			profileId,
			type,
			spendingType,
			timestamp,
			description,
			geoTag,
			category);
	} 
}