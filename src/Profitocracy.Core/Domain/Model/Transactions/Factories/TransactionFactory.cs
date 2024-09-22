using Profitocracy.Core.Domain.Model.Transactions.Entities;
using Profitocracy.Core.Domain.Model.Transactions.ValueObjects;

namespace Profitocracy.Core.Domain.Model.Transactions.Factories;

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