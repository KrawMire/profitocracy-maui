namespace Profitocracy.Infrastructure.Persistence.Sqlite.Configuration;

public class Constants
{
	public const string DatabaseFilename = "ProfitocracyLocalDb.db3";
	public const SQLite.SQLiteOpenFlags Flags =
		SQLite.SQLiteOpenFlags.ReadWrite |
		SQLite.SQLiteOpenFlags.Create |
		SQLite.SQLiteOpenFlags.SharedCache;
}