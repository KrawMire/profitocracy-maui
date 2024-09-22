using Profitocracy.Core.Domain.Model.Categories;
using Profitocracy.Core.Persistence;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Category;

namespace Profitocracy.Mobile.ViewModels.Categories;

public class AddExpenseCategoryPageViewModel : BaseNotifyObject
{
    private CategoryModel _model;
    private bool _isPlannedAmountPresent;
    private string? _plannedAmountStr;

    private readonly ICategoryRepository _categoryRepository;
    private readonly IProfileRepository _profileRepository;
    private readonly IPresentationMapper<Category, CategoryModel> _mapper;

    public AddExpenseCategoryPageViewModel(
        ICategoryRepository categoryRepository,
        IProfileRepository profileRepository,
        IPresentationMapper<Category, CategoryModel> mapper)
    {
        _categoryRepository = categoryRepository;
        _profileRepository = profileRepository;
        _mapper = mapper;

        _isPlannedAmountPresent = true;
        _model = new CategoryModel()
        {
            ProfileId = Guid.Empty,
            Name = string.Empty,
            PlannedAmount = null
        };
    }

    public string Name
    {
        get => _model.Name;
        set
        {
            _model.Name = value;
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
        set
        {
            _plannedAmountStr = value;
            OnPropertyChanged();
        }
    }

    public async Task CreateCategory()
    {
        if (_plannedAmountStr is not null)
        {
            if (!decimal.TryParse(_plannedAmountStr, out var plannedAmount))
            {
                throw new Exception("Planned amount must be a number");
            }

            _model.PlannedAmount = plannedAmount;
        }
        else
        {
            _model.PlannedAmount = null;
        }

        var profileId = await _profileRepository.GetCurrentProfileId();

        if (profileId is null)
        {
            throw new Exception("Cannot get current profile");
        }

        _model.ProfileId = (Guid)profileId;
        await _categoryRepository.Create(_mapper.MapToDomain(_model));
    }
}