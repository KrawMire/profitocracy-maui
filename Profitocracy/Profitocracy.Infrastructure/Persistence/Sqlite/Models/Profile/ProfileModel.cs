using SQLite;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Models.Profile;

public class ProfileModel
{
	public Guid Id { get; set; }
	
	[NotNull]
	public string Name { get; set; }
	
	[NotNull]
	public AnchorDateModel StartDate { get; set; }
	public decimal Balance { get; set; }
	public decimal SavedBalance { get; set; }
	public List<ProfileCategoryModel>? CategoriesNames { get; set; }
	public ProfileSettingsModel Settings { get; set; }
	public bool IsCurrent { get; set; }
}