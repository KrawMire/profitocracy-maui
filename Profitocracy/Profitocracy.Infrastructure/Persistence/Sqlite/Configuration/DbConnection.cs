using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Category;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Profile;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Transaction;
using SQLite;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Configuration;

public class DbConnection(InfrastructureConfiguration configuration)
{
	public SQLiteAsyncConnection Database
	{
		get
		{
			if (_database is null)
			{
				throw new NullReferenceException("Database connection is null. Need to call Init() before using DbConnection");
			}

			return _database;
		}
	}
	
	private SQLiteAsyncConnection? _database;
	private readonly InfrastructureConfiguration _configuration = 
		configuration ?? throw new ArgumentNullException(nameof(configuration));

	public async Task Init()
	{
		if (_database is not null)
		{
			return;	
		}

		_database = new SQLiteAsyncConnection(GetDatabasePath(Constants.DatabaseFilename), Constants.Flags);
		await CreateTables();
	}

	private async Task CreateTables()
	{
		if (_database is null)
		{
			throw new NullReferenceException("Local DB connection is not initialized");
		}
		
		_ = await _database.CreateTableAsync<TransactionModel>();
		_ = await _database.CreateTableAsync<CategoryModel>();
		_ = await _database.CreateTableAsync<ProfileModel>();
	}

	private string GetDatabasePath(string filename)
	{
		return Path.Combine(_configuration.AppDirectoryPath, filename);
	}
}