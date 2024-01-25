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
		SpendingType spendingType,
		DateTime timestamp,
		string? description,
		TransactionGeoTag? geoTag,
		TransactionCategory? category)
	{
		description = string.IsNullOrWhiteSpace(description) ? null : description;
		id ??= Guid.NewGuid();

		return new Transaction((Guid)id)
		{
			Amount = amount,
			ProfileId = profileId,
			Type = type,
			SpendingType = spendingType,
			Timestamp = timestamp,
			Description = description,
			GeoTag = geoTag,
			Category = category
		};
	} 
}