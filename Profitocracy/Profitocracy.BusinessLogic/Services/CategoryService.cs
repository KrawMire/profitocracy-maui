using Profitocracy.Domain.Boundaries.CategoryBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Repositories;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Services;

namespace Profitocracy.BusinessLogic.Services;

public class CategoryService : ICategoryService
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
}