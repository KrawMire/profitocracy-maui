using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;

namespace Profitocracy.Domain.Boundaries.TransactionBoundary.Services;

public interface ITransactionService
{
	Task<List<Transaction>> GetAll();
	Task<Transaction> Create(Transaction transaction);
}