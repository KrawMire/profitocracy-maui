using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate.ValueObjects;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Factories;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Transaction;

namespace Profitocracy.Mobile.Mappers;

public class TransactionMapper : IPresentationMapper<Transaction, TransactionModel>
{
	public Transaction MapToDomain(TransactionModel model)
	{
		return TransactionFactory.CreateTransaction(
			model.Id,
			model.Amount,
			model.ProfileId,
			(TransactionType)model.Type,
			(SpendingType)model.SpendingType,
			model.Timestamp,
			model.Description,
			null,
			null);
	}

	public TransactionModel MapToModel(Transaction entity)
	{
		return new TransactionModel
		{
			Id = entity.Id,
			Amount = entity.Amount,
			ProfileId = entity.ProfileId,
			Type = (int)entity.Type,
			SpendingType = (int)entity.SpendingType,
			Description = entity.Description,
			Timestamp = entity.Timestamp,
		};
	}
}