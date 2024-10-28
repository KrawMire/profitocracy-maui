using Profitocracy.Core.Domain.Model.Categories;

namespace Profitocracy.Core.Persistence;

/// <summary>
/// Provides operations for working with
/// persistence layer for categories
/// </summary>
public interface ICategoryRepository
{
	/// <summary>
	/// Get all categories for profile with specified ID
	/// </summary>
	/// <param name="profileId">ID of profile which categories are related to</param>
	/// <returns>List of categories of profile</returns>
	Task<List<Category>> GetAllByProfileId(Guid profileId);
	
	/// <summary>
	/// Create new category
	/// </summary>
	/// <param name="category">Category to create</param>
	/// <returns>Created category</returns>
	Task<Category> Create(Category category);
	
	/// <summary>
	/// Delete a category by its ID
	/// </summary>
	/// <param name="categoryId">Category ID to delete</param>
	/// <returns>ID of deleted category</returns>
	Task<Guid> Delete(Guid categoryId);
}