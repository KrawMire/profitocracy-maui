using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;

namespace Profitocracy.Domain.Boundaries.TransactionBoundary.Repositories;

public interface ITransactionRepository
{
	Task<List<Transaction>> GetAllByProfileId(Guid profileId);
	Task<List<Transaction>> GetForPeriod(Guid profileId, DateTime dateFrom, DateTime dateTo);
	Task<Transaction> Create(Transaction transaction);
	Task<Guid> Delete(Guid transactionId);
}