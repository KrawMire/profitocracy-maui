using Profitocracy.Domain.Boundaries.CategoryBoundary.Aggregate;
using Profitocracy.Infrastructure.Common.Abstractions;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Category;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Mappers;

public class CategoryMapper : IInfrastructureMapper<Category, CategoryModel>
{
	public Category MapToDomain(CategoryModel model)
	{
		return new Category(model.Id)
		{
			Name = model.Name,
			ProfileId = model.ProfileId,
			PlannedAmount = model.PlannedAmount
		};
	}

	public CategoryModel MapToModel(Category entity)
	{
		return new CategoryModel
		{
			Id = entity.Id,
			Name = entity.Name,
			ProfileId = entity.ProfileId,
			PlannedAmount = entity.PlannedAmount
		};
	}
}