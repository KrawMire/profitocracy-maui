using Profitocracy.Core.Domain.Model.Transactions;
using Profitocracy.Core.Domain.Model.Transactions.Entities;
using Profitocracy.Core.Domain.Model.Transactions.Factories;
using Profitocracy.Core.Domain.Model.Transactions.ValueObjects;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Transaction;

namespace Profitocracy.Mobile.Mappers;

public class TransactionMapper : IPresentationMapper<Transaction, TransactionModel>
{
	public Transaction MapToDomain(TransactionModel model)
	{
		TransactionCategory? category = null;

		if (model.Category is not null)
		{
			category = new TransactionCategory(model.Category.CategoryId)
			{
				Name = model.Category.Name
			};
		}
		
		return TransactionFactory.CreateTransaction(
			model.Id,
			model.Amount,
			model.ProfileId,
			(TransactionType)model.Type,
			model.SpendingType is null or -1 ? null : (SpendingType)model.SpendingType,
			model.Timestamp,
			model.Description,
			null,
			category);
	}

	public TransactionModel MapToModel(Transaction entity)
	{
		TransactionCategoryModel? category = null;

		if (entity.Category is not null)
		{
			category = new TransactionCategoryModel
			{
				CategoryId = entity.Category.Id,
				Name = entity.Category.Name
			};
		}
		
		return new TransactionModel
		{
			Id = entity.Id,
			Amount = entity.Amount,
			ProfileId = entity.ProfileId,
			Type = (int)entity.Type,
			SpendingType = entity.SpendingType is null ? null : (int)entity.SpendingType,
			Description = entity.Description,
			Timestamp = entity.Timestamp,
			Category = category
		};
	}
}