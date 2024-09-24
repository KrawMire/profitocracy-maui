using Profitocracy.Core.Domain.Model.Transactions;
using Profitocracy.Core.Specifications;

namespace Profitocracy.Core.Persistence;

public interface ITransactionRepository
{
	Task<List<Transaction>> GetAllByProfileId(Guid profileId);
	Task<List<Transaction>> GetForPeriod(Guid profileId, DateTime dateFrom, DateTime dateTo);
	Task<List<Transaction>> GetFiltered(TransactionsSpecification spec);
	Task<Transaction> Create(Transaction transaction);
	Task<Guid> Delete(Guid transactionId);
}