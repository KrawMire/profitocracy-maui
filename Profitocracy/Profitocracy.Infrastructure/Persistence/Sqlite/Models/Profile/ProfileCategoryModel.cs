namespace Profitocracy.Infrastructure.Persistence.Sqlite.Models.Profile;

public class ProfileCategoryModel
{
	public string Name { get; set; }
	public decimal ActualAmount { get; set; }
	public decimal? PlannedAmount { get; set; }
}