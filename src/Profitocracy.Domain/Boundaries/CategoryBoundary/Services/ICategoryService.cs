using Profitocracy.Domain.Boundaries.CategoryBoundary.Aggregate;

namespace Profitocracy.Domain.Boundaries.CategoryBoundary.Services;

public interface ICategoryService
{
	Task<List<Category>> GetAllByProfileId(Guid profileId);
	Task<Category> Create(Category category);
	Task<Guid> Delete(Guid categoryId);
}