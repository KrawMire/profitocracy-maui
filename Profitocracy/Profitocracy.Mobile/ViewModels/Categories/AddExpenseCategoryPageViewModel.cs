using Profitocracy.Domain.Boundaries.CategoryBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Services;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Category;

namespace Profitocracy.Mobile.ViewModels.Categories;

public class AddExpenseCategoryPageViewModel : BaseNotifyObject
{
    private CategoryModel _model;
    private bool _isPlannedAmountPresent;
    private string? _plannedAmountStr;

    private readonly ICategoryService _categoryService;
    private readonly IProfileService _profileService;
    private readonly IPresentationMapper<Category, CategoryModel> _mapper;

    public AddExpenseCategoryPageViewModel(
        ICategoryService categoryService,
        IProfileService profileService,
        IPresentationMapper<Category, CategoryModel> mapper)
    {
        _categoryService = categoryService ?? throw new ArgumentNullException(nameof(categoryService));
        _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        
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

        var profileId = await _profileService.GetCurrentProfileId();

        if (profileId is null)
        {
            throw new Exception("Cannot get current profile");
        }

        _model.ProfileId = (Guid)profileId;
        await _categoryService.Create(_mapper.MapToDomain(_model));
    }
}