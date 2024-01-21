namespace Profitocracy.Infrastructure.Persistence.Sqlite.Models;

public class TransactionModel
{
	public Guid Id { get; set; }
	public decimal Amount { get; set; }
}