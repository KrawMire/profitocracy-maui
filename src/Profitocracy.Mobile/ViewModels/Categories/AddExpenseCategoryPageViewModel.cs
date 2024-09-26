using Profitocracy.Core.Domain.Model.Categories;
using Profitocracy.Core.Domain.Model.Categories.Factories;
using Profitocracy.Core.Persistence;
using Profitocracy.Mobile.Abstractions;

namespace Profitocracy.Mobile.ViewModels.Categories;

public class AddExpenseCategoryPageViewModel : BaseNotifyObject
{
    private readonly Category _category;
    private bool _isPlannedAmountPresent;
    private string? _plannedAmountStr;

    private readonly ICategoryRepository _categoryRepository;
    private readonly IProfileRepository _profileRepository;

    public AddExpenseCategoryPageViewModel(
        ICategoryRepository categoryRepository,
        IProfileRepository profileRepository)
    {
        _categoryRepository = categoryRepository;
        _profileRepository = profileRepository;

        _isPlannedAmountPresent = true;
        _category = CategoryFactory.CreateCategory(
            id: null,
            Guid.Empty,
            string.Empty,
            null);
    }

    public string Name
    {
        get => _category.Name;
        set
        {
            _category.Name = value;
            OnPropertyChanged();
        }
    }

    public bool IsPlannedAmountPresent
    {
        get => _isPlannedAmountPresent;
        set
        {
            if (!value)
            {
                _plannedAmountStr = null;
            }

            _isPlannedAmountPresent = value;
            OnPropertyChanged();
        }
    }

    public string PlannedAmount
    {
        get => _plannedAmountStr ?? string.Empty;
        set => SetProperty(ref _plannedAmountStr, value);
    }

    public async Task CreateCategory()
    {
        if (_plannedAmountStr is not null)
        {
            if (!decimal.TryParse(_plannedAmountStr, out var plannedAmount))
            {
                throw new Exception("Planned amount must be a number");
            }

            _category.PlannedAmount = plannedAmount;
        }
        else
        {
            _category.PlannedAmount = null;
        }

        var profileId = await _profileRepository.GetCurrentProfileId();

        if (profileId is null)
        {
            throw new Exception("Cannot get current profile");
        }

        _category.ProfileId = (Guid)profileId;
        await _categoryRepository.Create(_category);
    }
}