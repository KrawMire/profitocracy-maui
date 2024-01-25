using SQLite;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Models.Category;

public class CategoryModel
{
	[PrimaryKey]
	public Guid Id { get; set; }
	public Guid ProfileId { get; set; }
	
	[NotNull]
	public string Name { get; set; }
	public decimal? PlannedAmount { get; set; }
}