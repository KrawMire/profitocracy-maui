using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Profile;
using Profitocracy.Mobile.ViewModels.Common;

namespace Profitocracy.Mobile.ViewModels.Home;

public class HomePageViewModel : ViewModelBase
{
    private ProfileModel? _profile;
    
    private float _totalBalanceRatio;
    private float _dailyFromActualRatio;
    private float _dailyFromInitialRatio;
    private float _mainExpensesRatio;
    private float _secondaryExpensesRatio;
    private float _savedRatio;
    private string _dateFrom;
    private string _dateTo;
    
    private readonly IProfileService _profileService;
    private readonly IPresentationMapper<Profile, ProfileModel> _mapper;

    public ProfileModel? Profile
    {
        get => _profile;
        private set
        {
            if (_profile == value)
            {
                return;
            }

            _profile = value;
            OnPropertyChanged();
        }
    }

    public float TotalBalanceRatio
    {
        get => _totalBalanceRatio;
        private set
        {
            if (_totalBalanceRatio == value)
            {
                return;
            }

            _totalBalanceRatio = value;
            OnPropertyChanged();   
        }
    }

    public float DailyFromActualRatio
    {
        get => _dailyFromActualRatio;
        private set
        {
            if (_dailyFromActualRatio == value)
            {
                return;
            }

            _dailyFromActualRatio = value;
            OnPropertyChanged();
        }
    }

    public float DailyFromInitialRatio
    {
        get => _dailyFromInitialRatio;
        private set
        {
            if (_dailyFromInitialRatio == value)
            {
                return;
            }

            _dailyFromInitialRatio = value;
            OnPropertyChanged();
        }
    }

    public float MainExpensesRatio
    {
        get => _mainExpensesRatio;
        private set
        {
            if (_mainExpensesRatio == value)
            {
                return;
            }

            _mainExpensesRatio = value;
            OnPropertyChanged();
        }
    }

    public float SecondaryExpensesRatio
    {
        get => _secondaryExpensesRatio;
        private set
        {
            if (_secondaryExpensesRatio == value)
            {
                return;
            }

            _secondaryExpensesRatio = value;
            OnPropertyChanged();
        }
    }

    public float SavedRatio
    {
        get => _savedRatio;
        private set
        {
            if (_savedRatio == value)
            {
                return;
            }

            _savedRatio = value;
            OnPropertyChanged();
        }
    }

    public string DateFrom
    {
        get => _dateFrom;
        private set
        {
            if (_dateFrom == value)
            {
                return;
            }

            _dateFrom = value;
            OnPropertyChanged();
        }
    }

    public string DateTo
    {
        get => _dateTo;
        private set
        {
            if (_dateTo == value)
            {
                return;
            }

            _dateTo = value;
            OnPropertyChanged();
        }
    }
    
    public HomePageViewModel(IProfileService profileService, IPresentationMapper<Profile, ProfileModel> mapper)
    {
        _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async void Initialize()
    {
        var currentProfile = await _profileService.GetCurrentProfile();

        if (currentProfile is null)
        {
            return;
        }
        
        Profile = _mapper.MapToModel(currentProfile);

        if (Profile.Expenses is null)
        {
            return;
        }
        
        var expenses = Profile.Expenses;

        TotalBalanceRatio = GetExpenseRatio(expenses.TotalBalance);
        DailyFromActualRatio = GetExpenseRatio(expenses.DailyFromActualBalance);
        DailyFromInitialRatio = GetExpenseRatio(expenses.DailyFromInitialBalance);
        MainExpensesRatio = GetExpenseRatio(expenses.Main);
        SecondaryExpensesRatio = GetExpenseRatio(expenses.Secondary);
        SavedRatio = GetExpenseRatio(expenses.Saved);
        
        DateFrom = Profile?.StartDate.ToString("dd.MM.yyyy") ?? "unknown";
        DateTo = DateTime.Now.ToString("dd.MM.yyyy");
    }

    private float GetExpenseRatio(ProfileExpenseModel expense)
    {
        if (expense.PlannedAmount == 0)
        {
            return 1;
        }

        return (float)(expense.ActualAmount / expense.PlannedAmount);
    }
}