using Profitocracy.Domain.Boundaries.CategoryBoundary.Aggregate;

namespace Profitocracy.Domain.Boundaries.CategoryBoundary.Repositories;

public interface ICategoryRepository
{
	Task<List<Category>> GetAllByProfileId(Guid profileId);
	Task<Category> Create(Category category);
	Task<Guid> Delete(Guid categoryId);
}