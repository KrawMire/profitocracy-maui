using System.Collections.ObjectModel;
using Profitocracy.Core.Persistence;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Categories;

namespace Profitocracy.Mobile.ViewModels.Categories;

public class ExpenseCategoriesSettingsPageViewModel : BaseNotifyObject
{
    private readonly IProfileRepository _profileRepository;
    private readonly ICategoryRepository _categoryRepository;

    public ExpenseCategoriesSettingsPageViewModel(
        IProfileRepository profileRepository,
        ICategoryRepository categoryRepository)
    {
        _profileRepository = profileRepository;
        _categoryRepository = categoryRepository;
    }

    public readonly ObservableCollection<CategoryModel> Categories = [];

    public async Task Initialize()
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
            Categories.Add(CategoryModel.FromDomain(category));
        }
    }
}