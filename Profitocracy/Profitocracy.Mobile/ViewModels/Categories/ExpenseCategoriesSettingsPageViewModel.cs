using System.Collections.ObjectModel;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Services;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Category;

namespace Profitocracy.Mobile.ViewModels.Categories;

public class ExpenseCategoriesSettingsPageViewModel : BaseNotifyObject
{
    private readonly IProfileService _profileService;
    private readonly ICategoryService _categoryService;
    private readonly IPresentationMapper<Category, CategoryModel> _categoryMapper;

    public ExpenseCategoriesSettingsPageViewModel(
        IProfileService profileService,
        ICategoryService categoryService, 
        IPresentationMapper<Category, CategoryModel> categoryMapper)
    {
        _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
        _categoryService = categoryService ?? throw new ArgumentNullException(nameof(categoryService));
        _categoryMapper = categoryMapper ?? throw new ArgumentNullException(nameof(categoryMapper));
    }
    
    public readonly ObservableCollection<CategoryModel> Categories = [];

    public async void Initialize()
    {
        var profileId = await _profileService.GetCurrentProfileId();

        if (profileId is null)
        {
            await Shell.Current.DisplayAlert("Error", "Cannot find current profile", "OK");
            return;
        }
        
        var categories = await _categoryService.GetAllByProfileId((Guid)profileId);
        Categories.Clear();

        foreach (var category in categories)
        {
            Categories.Add(_categoryMapper.MapToModel(category));
        }
    }
}