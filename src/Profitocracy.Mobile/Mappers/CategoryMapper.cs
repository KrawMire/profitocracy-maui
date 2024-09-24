using Profitocracy.Core.Domain.Model.Categories;
using Profitocracy.Core.Domain.Model.Categories.Factories;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Category;

namespace Profitocracy.Mobile.Mappers;

public class CategoryMapper : IPresentationMapper<Category, CategoryModel>
{
    public Category MapToDomain(CategoryModel model)
    {
        return CategoryFactory.CreateCategory(
            model.Id,
            model.ProfileId,
            model.Name,
            model.PlannedAmount);
    }

    public CategoryModel MapToModel(Category entity)
    {
        return new CategoryModel
        {
            Id = entity.Id,
            ProfileId = entity.ProfileId,
            Name = entity.Name,
            PlannedAmount = entity.PlannedAmount
        };
    }
}