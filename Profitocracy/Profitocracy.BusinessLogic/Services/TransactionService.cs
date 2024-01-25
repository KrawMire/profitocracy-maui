using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Repositories;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Services;

namespace Profitocracy.BusinessLogic.Services;

public class TransactionService : ITransactionService
{
	private readonly ITransactionRepository _transactionRepository;
	
	public TransactionService(ITransactionRepository transactionRepository)
	{
		_transactionRepository = transactionRepository ?? throw new ArgumentNullException(nameof(transactionRepository));
	}

	public Task<List<Transaction>> GetAllByProfileId(Guid profileId)
	{
		return _transactionRepository.GetAllByProfileId(profileId);
	}

	public Task<Transaction> Create(Transaction transaction)
	{
		return _transactionRepository.Create(transaction);
	}
}