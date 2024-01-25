using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Infrastructure.Common.Abstractions;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Transaction;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Mappers;

public class TransactionMapper : IInfrastructureMapper<Transaction, TransactionModel>
{
	public Transaction MapToDomain(TransactionModel model)
	{
		return new Transaction(model.Id)
		{
			Amount = model.Amount
		};
	}

	public TransactionModel MapToModel(Transaction entity)
	{
		return new TransactionModel
		{
			Id = entity.Id,
			Amount = entity.Amount
		};
	}
}