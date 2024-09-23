using Profitocracy.Core.Domain.Model.Transactions;
using Profitocracy.Core.Persistence;
using Profitocracy.Infrastructure.Abstractions.Internal;
using Profitocracy.Infrastructure.Persistence.Sqlite.Configuration;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Transaction;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Repositories;

internal class TransactionRepository : ITransactionRepository
{
	private readonly DbConnection _dbConnection;
	private readonly IInfrastructureMapper<Transaction, TransactionModel> _mapper;

	public TransactionRepository(
		DbConnection dbConnection, 
		IInfrastructureMapper<Transaction, TransactionModel> mapper)
	{
		_dbConnection = dbConnection;
		_mapper = mapper;
	}

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

	public async Task<List<Transaction>> GetForPeriod(Guid profileId, DateTime dateFrom, DateTime dateTo)
	{
		await _dbConnection.Init();

		var transactions = await _dbConnection.Database
			.Table<TransactionModel>()
			.Where(t => t.ProfileId == profileId)
			.Where(t => t.Timestamp >= dateFrom)
			.Where(t => t.Timestamp <= dateTo)
			.ToListAsync();

		if (transactions is null)
		{
			return [];
		}

		return transactions
			.Select(_mapper.MapToDomain)
			.ToList();
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