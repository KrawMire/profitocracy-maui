using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;

namespace Profitocracy.Domain.Boundaries.TransactionBoundary.Repositories;

public interface ITransactionRepository
{
	Task<List<Transaction>> GetAll();
	Task<Transaction> Create(Transaction transaction);
}