using System.Collections.ObjectModel;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.DisplayModels;
using Profitocracy.Mobile.Models.Profile;
using Profitocracy.Mobile.Utils;

namespace Profitocracy.Mobile.ViewModels.Home;

public class HomePageViewModel : BaseNotifyObject
{
    private ProfileModel? _profile;

    private decimal _balance;
    private decimal _totalActualAmount;
    private decimal _totalPlannedAmount;
    private decimal _totalSavedAmount;
    private decimal _dailyFromActualActualAmount;
    private decimal _dailyFromActualPlannedAmount;
    private decimal _dailyFromInitialActualAmount;
    private decimal _dailyFromInitialPlannedAmount;
    private decimal _mainActualAmount;
    private decimal _mainPlannedAmount;
    private decimal _secondaryActualAmount;
    private decimal _secondaryPlannedAmount;
    private decimal _savedActualAmount;
    private decimal _savedPlannedAmount;
    
    private float _totalBalanceRatio;
    private float _dailyFromActualRatio;
    private float _dailyFromInitialRatio;
    private float _mainExpensesRatio;
    private float _secondaryExpensesRatio;
    private float _savedRatio;
    
    private string _dateFrom;
    private string _dateTo;

    private bool _isDisplayCategoriesSpendings;
    
    private readonly IProfileService _profileService;
    private readonly IPresentationMapper<Profile, ProfileModel> _mapper;

    public decimal Balance
    {
        get => _balance;
        set
        {
            if (value != _balance)
            {
                _balance = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal TotalActualAmount
    {
        get => _totalActualAmount;
        set
        {
            if (value != _totalActualAmount)
            {
                _totalActualAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal TotalPlannedAmount
    {
        get => _totalPlannedAmount;
        set
        {
            if (value != _totalPlannedAmount)
            {
                _totalPlannedAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal TotalSavedAmount
    {
        get => _totalSavedAmount;
        set
        {
            if (value != _totalSavedAmount)
            {
                _totalSavedAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal DailyFromActualActualAmount
    {
        get => _dailyFromActualActualAmount;
        set
        {
            if (value != _dailyFromActualActualAmount)
            {
                _dailyFromActualActualAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal DailyFromActualPlannedAmount
    {
        get => _dailyFromActualPlannedAmount;
        set
        {
            if (value != _dailyFromActualPlannedAmount)
            {
                _dailyFromActualPlannedAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal DailyFromInitialActualAmount
    {
        get => _dailyFromInitialActualAmount;
        set
        {
            if (value != _dailyFromInitialActualAmount)
            {
                _dailyFromInitialActualAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal DailyFromInitialPlannedAmount
    {
        get => _dailyFromInitialPlannedAmount;
        set
        {
            if (value != _dailyFromInitialPlannedAmount)
            {
                _dailyFromInitialPlannedAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal MainActualAmount
    {
        get => _mainActualAmount;
        set
        {
            if (value != _mainActualAmount)
            {
                _mainActualAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal MainPlannedAmount
    {
        get => _mainPlannedAmount;
        set
        {
            if (value != _mainPlannedAmount)
            {
                _mainPlannedAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal SecondaryActualAmount
    {
        get => _secondaryActualAmount;
        set
        {
            if (value != _secondaryActualAmount)
            {
                _secondaryActualAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal SecondaryPlannedAmount
    {
        get => _secondaryPlannedAmount;
        set
        {
            if (value != _secondaryPlannedAmount)
            {
                _secondaryPlannedAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal SavedActualAmount
    {
        get => _savedActualAmount;
        set
        {
            if (value != _savedActualAmount)
            {
                _savedActualAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public decimal SavedPlannedAmount
    {
        get => _savedPlannedAmount;
        set
        {
            if (value != _savedPlannedAmount)
            {
                _savedPlannedAmount = value;
                OnPropertyChanged();
            }
        }
    }
    
    public float TotalBalanceRatio
    {
        get => _totalBalanceRatio;
        private set
        {
            if (_totalBalanceRatio != value)
            {
                _totalBalanceRatio = value;
                OnPropertyChanged();   
            }
        }
    }

    public float DailyFromActualRatio
    {
        get => _dailyFromActualRatio;
        private set
        {
            if (_dailyFromActualRatio != value)
            {
                _dailyFromActualRatio = value;
                OnPropertyChanged();
            }
        }
    }

    public float DailyFromInitialRatio
    {
        get => _dailyFromInitialRatio;
        private set
        {
            if (_dailyFromInitialRatio != value)
            {
                _dailyFromInitialRatio = value;
                OnPropertyChanged();
            }
        }
    }

    public float MainExpensesRatio
    {
        get => _mainExpensesRatio;
        private set
        {
            if (_mainExpensesRatio != value)
            {
                _mainExpensesRatio = value;
                OnPropertyChanged();
            }
        }
    }

    public float SecondaryExpensesRatio
    {
        get => _secondaryExpensesRatio;
        private set
        {
            if (_secondaryExpensesRatio != value)
            {
                _secondaryExpensesRatio = value;
                OnPropertyChanged();
            }
        }
    }

    public float SavedRatio
    {
        get => _savedRatio;
        private set
        {
            if (_savedRatio != value)
            {
                _savedRatio = value;
                OnPropertyChanged();
            }
        }
    }

    public string DateFrom
    {
        get => _dateFrom;
        private set
        {
            if (_dateFrom != value)
            {
                _dateFrom = value;
                OnPropertyChanged();
            }
        }
    }

    public string DateTo
    {
        get => _dateTo;
        private set
        {
            if (_dateTo != value)
            {
                _dateTo = value;
                OnPropertyChanged();
            }
        }
    }

    public bool IsDisplayCategoriesSpendings
    {
        get => _isDisplayCategoriesSpendings;
        set
        {
            _isDisplayCategoriesSpendings = value;
            OnPropertyChanged();
        }
    }
    
    
    public ObservableCollection<DisplayCategoryExpense> CategoriesExpenses = [];
    
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
        
        var profile = _mapper.MapToModel(currentProfile);

        if (profile.Expenses is null)
        {
            return;
        }

        Balance = NumberUtils.RoundDecimal(profile.Balance);
        TotalSavedAmount = profile.SavedBalance;
        DateFrom = profile.BillingDateFrom.ToString("dd.MM.yyyy");
        DateTo = profile.BillingDateTo.ToString("dd.MM.yyyy");
        
        InitializeExpenses(profile.Expenses);

        if (profile.CategoriesBalances is not null && profile.CategoriesBalances.Count > 0)
        {
            IsDisplayCategoriesSpendings = true;
            InitializeCategoriesExpenses(profile.CategoriesBalances);   
        }
        else
        {
            IsDisplayCategoriesSpendings = false;
        }
    }

    private void InitializeExpenses(ProfileExpensesModel expenses)
    {
        TotalActualAmount = NumberUtils.RoundDecimal(expenses.TotalBalance.ActualAmount);
        TotalPlannedAmount = NumberUtils.RoundDecimal(expenses.TotalBalance.PlannedAmount);
        DailyFromActualActualAmount = NumberUtils.RoundDecimal(expenses.DailyFromActualBalance.ActualAmount);
        DailyFromActualPlannedAmount = NumberUtils.RoundDecimal(expenses.DailyFromActualBalance.PlannedAmount);
        DailyFromInitialActualAmount = NumberUtils.RoundDecimal(expenses.DailyFromInitialBalance.ActualAmount);
        DailyFromInitialPlannedAmount = NumberUtils.RoundDecimal(expenses.DailyFromInitialBalance.PlannedAmount);
        MainActualAmount = NumberUtils.RoundDecimal(expenses.Main.ActualAmount);
        MainPlannedAmount = NumberUtils.RoundDecimal(expenses.Main.PlannedAmount);
        SecondaryActualAmount = NumberUtils.RoundDecimal(expenses.Secondary.ActualAmount);
        SecondaryPlannedAmount = NumberUtils.RoundDecimal(expenses.Secondary.PlannedAmount);
        SavedActualAmount = NumberUtils.RoundDecimal(expenses.Saved.ActualAmount);
        SavedPlannedAmount = NumberUtils.RoundDecimal(expenses.Saved.PlannedAmount);
        
        InitializeExpenseRatios(expenses);
    }
    
    private void InitializeExpenseRatios(ProfileExpensesModel expenses)
    {
        TotalBalanceRatio = GetExpenseRatio(expenses.TotalBalance.ActualAmount, expenses.TotalBalance.PlannedAmount);
        DailyFromActualRatio = GetExpenseRatio(expenses.DailyFromActualBalance.ActualAmount, expenses.DailyFromActualBalance.PlannedAmount);
        DailyFromInitialRatio = GetExpenseRatio(expenses.DailyFromInitialBalance.ActualAmount, expenses.DailyFromInitialBalance.PlannedAmount);
        MainExpensesRatio = GetExpenseRatio(expenses.Main.ActualAmount, expenses.Main.PlannedAmount);
        SecondaryExpensesRatio = GetExpenseRatio(expenses.Secondary.ActualAmount, expenses.Secondary.PlannedAmount);
        SavedRatio = GetExpenseRatio(expenses.Saved.ActualAmount, expenses.Saved.PlannedAmount);
    }

    private void InitializeCategoriesExpenses(List<CategoryExpenseModel> expenses)
    {
        CategoriesExpenses.Clear();
        
        foreach (var expense in expenses)
        {
            DisplayCategoryExpense categoryExpense;
            
            if (expense.PlannedAmount is null or 0)
            {
                categoryExpense = new DisplayCategoryExpense(
                    expense.Name, 
                    NumberUtils.RoundDecimal(expense.ActualAmount),
                    false,
                    null, 
                    null);
            }
            else
            {
                categoryExpense = new DisplayCategoryExpense(
                    expense.Name, 
                    NumberUtils.RoundDecimal(expense.ActualAmount),
                    true,
                    NumberUtils.RoundDecimal(expense.PlannedAmount),
                    GetExpenseRatio(expense.ActualAmount, expense.PlannedAmount));
            }
            
            CategoriesExpenses.Add(categoryExpense);
        }
    }
    
    private float GetExpenseRatio(decimal? actualAmount, decimal? plannedAmount)
    {
        if (actualAmount is null || plannedAmount is null)
        {
            return 1;
        }
        
        if (plannedAmount == 0)
        {
            return 1;
        }

        return (float)(actualAmount / plannedAmount);
    }
}