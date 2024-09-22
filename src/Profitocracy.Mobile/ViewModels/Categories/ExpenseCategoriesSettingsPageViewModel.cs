using System.Collections.ObjectModel;
using Profitocracy.Core.Domain.Model.Categories;
using Profitocracy.Core.Persistence;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Category;

namespace Profitocracy.Mobile.ViewModels.Categories;

public class ExpenseCategoriesSettingsPageViewModel : BaseNotifyObject
{
    private readonly IProfileRepository _profileRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IPresentationMapper<Category, CategoryModel> _categoryMapper;

    public ExpenseCategoriesSettingsPageViewModel(
        IProfileRepository profileRepository,
        ICategoryRepository categoryService, 
        IPresentationMapper<Category, CategoryModel> categoryMapper)
    {
        _profileRepository = profileRepository;
        _categoryRepository = categoryService;
        _categoryMapper = categoryMapper;
    }
    
    public readonly ObservableCollection<CategoryModel> Categories = [];

    public async void Initialize()
    {
        var profileId = await _profileRepository.GetCurrentProfileId();

        if (profileId is null)
        {
            await Shell.Current.DisplayAlert("Error", "Cannot find current profile", "OK");
            return;
        }
        
        var categories = await _categoryRepository.GetAllByProfileId((Guid)profileId);
        Categories.Clear();

        foreach (var category in categories)
        {
            Categories.Add(_categoryMapper.MapToModel(category));
        }
    }
}