using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;

namespace Profitocracy.Domain.Boundaries.TransactionBoundary.Services;

public interface ITransactionService
{
	Task<List<Transaction>> GetAllByProfileId(Guid profileId);
	Task<Transaction> Create(Transaction transaction);
	Task<Guid> Delete(Guid transactionId);
}