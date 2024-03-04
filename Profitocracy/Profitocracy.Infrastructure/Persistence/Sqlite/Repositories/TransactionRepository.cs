using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Repositories;
using Profitocracy.Infrastructure.Common.Abstractions;
using Profitocracy.Infrastructure.Persistence.Sqlite.Configuration;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Transaction;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Repositories;

public class TransactionRepository(
	DbConnection dbConnection, 
	IInfrastructureMapper<Transaction, TransactionModel> mapper) : ITransactionRepository
{
	private readonly DbConnection _dbConnection = dbConnection ?? throw new ArgumentNullException(nameof(dbConnection));
	private readonly IInfrastructureMapper<Transaction, TransactionModel> _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

	public async Task<List<Transaction>> GetAllByProfileId(Guid profileId)
	{
		await _dbConnection.Init();

		var transactions = await _dbConnection.Database
			.Table<TransactionModel>()
			.Where(t => t.ProfileId.Equals(profileId))
			.OrderByDescending(t => t.Timestamp)
			.ToListAsync();

		if (transactions is null)
		{
			return [];
		}

		var domainTransactions = transactions
			.Select(_mapper.MapToDomain)
			.ToList();

		return domainTransactions;
	}

	public async Task<Transaction> Create(Transaction transaction)
	{
		await _dbConnection.Init();
		
		var transactionToCreate = _mapper.MapToModel(transaction);
		_ = await _dbConnection.Database.InsertAsync(transactionToCreate);
		
		var createdTransaction = await _dbConnection.Database
			.Table<TransactionModel>()
			.Where(t => t.Id.Equals(transaction.Id))
			.FirstOrDefaultAsync();
		
		return _mapper.MapToDomain(createdTransaction);
	}

	public async Task<Guid> Delete(Guid transactionId)
	{
		await _dbConnection.Init();

		_ = await _dbConnection.Database
			.Table<TransactionModel>()
			.DeleteAsync(t => t.Id == transactionId);

		return transactionId;
	}
}