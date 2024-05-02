using Profitocracy.Domain.Boundaries.CategoryBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Repositories;
using Profitocracy.Infrastructure.Common.Abstractions;
using Profitocracy.Infrastructure.Persistence.Sqlite.Configuration;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Category;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Repositories;

public class CategoryRepository : ICategoryRepository
{
	private readonly DbConnection _dbConnection;
	private readonly IInfrastructureMapper<Category, CategoryModel> _mapper;
	
	public CategoryRepository(
		DbConnection connection,
		IInfrastructureMapper<Category, CategoryModel> mapper)
	{
		_dbConnection = connection ?? throw new ArgumentNullException(nameof(connection));
		_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
	}
	
	public async Task<List<Category>> GetAllByProfileId(Guid profileId)
	{
		await _dbConnection.Init();

		var categories = await _dbConnection.Database
			.Table<CategoryModel>()
			.Where(c => c.ProfileId.Equals(profileId))
			.ToListAsync();

		var domainCategories = categories
			.Select(_mapper.MapToDomain)
			.ToList();

		return domainCategories;
	}

	public async Task<Category> Create(Category category)
	{
		await _dbConnection.Init();

		var categoryToCreate = _mapper.MapToModel(category);
		_ = await _dbConnection.Database.InsertAsync(categoryToCreate);

		var createdCategory = await _dbConnection.Database
			.Table<CategoryModel>()
			.Where(c => c.Id == categoryToCreate.Id)
			.FirstAsync();

		return _mapper.MapToDomain(createdCategory);
	}
}