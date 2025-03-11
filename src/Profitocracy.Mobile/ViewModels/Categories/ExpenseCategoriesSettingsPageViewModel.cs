using System.Collections.ObjectModel;
using Profitocracy.Core.Domain.Abstractions.Services;
using Profitocracy.Core.Persistence;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Categories;
using Profitocracy.Mobile.Resources.Strings;

namespace Profitocracy.Mobile.ViewModels.Categories;

public class ExpenseCategoriesSettingsPageViewModel : BaseNotifyObject
{
    private readonly IProfileRepository _profileRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly ICategoryService _categoryService;

    public ExpenseCategoriesSettingsPageViewModel(
        IProfileRepository profileRepository,
        ICategoryRepository categoryRepository, 
        ICategoryService categoryService)
    {
        _profileRepository = profileRepository;
        _categoryRepository = categoryRepository;
        _categoryService = categoryService;
    }

    public readonly ObservableCollection<CategoryModel> Categories = [];

    public async Task Initialize()
    {
        var profileId = await _profileRepository.GetCurrentProfileId();

        if (profileId is null)
        {
            throw new Exception(AppResources.CommonError_GetCurrentProfile);
        }

        var categories = await _categoryRepository.GetAllByProfileId((Guid)profileId);
        Categories.Clear();

        foreach (var category in categories)
        {
            Categories.Add(CategoryModel.FromDomain(category));
        }
    }

    public async Task DeleteCategory(Guid categoryId)
    {
        var deletedId = await _categoryService.DeleteCategory(categoryId);

        Categories.Remove(Categories.Single(c => c.Id == deletedId));
    }
}