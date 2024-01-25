using SQLite;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Models.Transaction;

public class TransactionModel
{
	[PrimaryKey]
	public Guid Id { get; set; }
	public decimal Amount { get; set; }
	public Guid ProfileId { get; set; }
	public short Type { get; set; }
	public short SpendingType { get; set; }
	public DateTime Timestamp { get; set; }
	public string? Description { get; set; }
	public GeoTagModel? GeoTag { get; set; }
	public string? CategoryName { get; set; }
}