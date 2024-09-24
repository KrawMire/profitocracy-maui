using Profitocracy.Core.Domain.Model.Categories;
using Profitocracy.Infrastructure.Abstractions.Internal;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Category;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Mappers;

internal class CategoryMapper : IInfrastructureMapper<Category, CategoryModel>
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