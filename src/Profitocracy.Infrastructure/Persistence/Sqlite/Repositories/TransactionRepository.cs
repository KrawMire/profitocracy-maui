using Profitocracy.Core.Domain.Model.Transactions;
using Profitocracy.Core.Persistence;
using Profitocracy.Core.Specifications;
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

	public async Task<Transaction?> GetById(Guid transactionId)
	{
		await _dbConnection.Init();

		var transaction = await _dbConnection.Database
			.Table<TransactionModel>()
			.Where(t => t.Id.Equals(transactionId))
			.FirstOrDefaultAsync();

		return transaction is not null 
			? _mapper.MapToDomain(transaction) 
			: null;
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

	public async Task<List<Transaction>> GetFiltered(TransactionsSpecification spec)
	{
		await _dbConnection.Init();

		var query = _dbConnection.Database
			.Table<TransactionModel>()
			.Where(t => t.ProfileId == spec.ProfileId);

		if (spec.SpendingType is not null)
		{
			query = query.Where(t => t.SpendingType.Equals(spec.SpendingType));
		}

		if (spec.CategoryId is not null)
		{
			query = query.Where(t => t.CategoryId == spec.CategoryId);
		}

		if (spec.FromDate is not null)
		{
			query = query.Where(t => t.Timestamp >= spec.FromDate);
		}

		if (spec.ToDate is not null)
		{
			query = query.Where(t => t.Timestamp <= spec.ToDate);
		}

		if (spec.IsMultiCurrency is not null)
		{
			query = query.Where(t => t.DestinationCurrencyCode != null);
		}

		if (spec.Destination is not null)
		{
			query = query.Where(t => t.Destination == (short)spec.Destination);
		}

		query = query.OrderByDescending(t => t.Timestamp);
		
		var transactions = await query.ToListAsync();

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
		await _dbConnection.Database.InsertAsync(transactionToCreate);
		
		var createdTransaction = await _dbConnection.Database
			.Table<TransactionModel>()
			.Where(t => t.Id.Equals(transaction.Id))
			.FirstOrDefaultAsync();
		
		return _mapper.MapToDomain(createdTransaction);
	}

	public async Task<Transaction> Update(Transaction transaction)
	{
		await _dbConnection.Init();
		
		var transactionToUpdate = _mapper.MapToModel(transaction);
		await _dbConnection.Database.UpdateAsync(transactionToUpdate);
		
		var updatedTransaction = await _dbConnection.Database
			.Table<TransactionModel>()
			.Where(t => t.Id.Equals(transaction.Id))
			.FirstOrDefaultAsync();

		return _mapper.MapToDomain(updatedTransaction);
	}

	public async Task<Guid> ClearWithCategory(Guid categoryId)
	{
		await _dbConnection.Init();

		var transactionsToUpdate = await _dbConnection.Database
			.Table<TransactionModel>()
			.Where(t => t.CategoryId == categoryId)
			.ToListAsync();
		
		foreach (var transaction in transactionsToUpdate)
		{
			transaction.CategoryId = null;
			transaction.CategoryName = null;
		}
		
		await _dbConnection.Database.UpdateAllAsync(transactionsToUpdate);
		
		return categoryId;
	}

	public async Task<Guid> ChangeCategoryName(Guid categoryId, string newName)
	{
		await _dbConnection.Init();

		var transactionsToUpdate = await _dbConnection.Database
			.Table<TransactionModel>()
			.Where(t => t.CategoryId == categoryId)
			.ToListAsync();
		
		foreach (var transaction in transactionsToUpdate)
		{
			transaction.CategoryName = newName;
		}
		
		await _dbConnection.Database.UpdateAllAsync(transactionsToUpdate);
		
		return categoryId;
	}

	public async Task<Guid> Delete(Guid transactionId)
	{
		await _dbConnection.Init();

		await _dbConnection.Database
			.Table<TransactionModel>()
			.DeleteAsync(t => t.Id == transactionId);

		return transactionId;
	}
}