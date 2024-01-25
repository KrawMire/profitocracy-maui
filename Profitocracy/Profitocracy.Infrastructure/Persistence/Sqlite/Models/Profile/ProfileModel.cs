using SQLite;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Models.Profile;

public class ProfileModel
{
	[PrimaryKey]
	public Guid Id { get; set; }
	public string Name { get; set; }
	public DateTime StartTimestamp { get; set; }
	public decimal InitialBalance { get; set; }
	public decimal Balance { get; set; }
	public decimal SavedBalance { get; set; }
	public string CurrencyName { get; set; }
	public string CurrencyCode { get; set; }
	public string CurrencySymbol { get; set; }
	
	public bool IsCurrent { get; set; }
	
	[Ignore]
	public List<ProfileCategoryModel>? Categories { get; set; }
}