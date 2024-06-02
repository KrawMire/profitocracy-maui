using Profitocracy.Domain.Boundaries.CategoryBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Repositories;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Services;

namespace Profitocracy.BusinessLogic.Services;

internal class CategoryService : ICategoryService
{
	private readonly ICategoryRepository _repository;
	
	public CategoryService(ICategoryRepository repository)
	{
		_repository = repository ?? throw new ArgumentNullException(nameof(repository));
	}
	
	public Task<List<Category>> GetAllByProfileId(Guid profileId)
	{
		return _repository.GetAllByProfileId(profileId);
	}

	public Task<Category> Create(Category category)
	{
		return _repository.Create(category);
	}

	public Task<Guid> Delete(Guid categoryId)
	{
		throw new NotImplementedException();
	}
}