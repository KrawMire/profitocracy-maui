using Profitocracy.Core.Domain.Model.Categories;

namespace Profitocracy.Core.Persistence;

public interface ICategoryRepository
{
	Task<List<Category>> GetAllByProfileId(Guid profileId);
	Task<Category> Create(Category category);
	Task<Guid> Delete(Guid categoryId);
}