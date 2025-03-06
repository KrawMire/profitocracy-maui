using System.Collections.ObjectModel;
using System.Windows.Input;
using Profitocracy.Core.Domain.Abstractions.Services;
using Profitocracy.Core.Domain.Model.Profiles.Entities;
using Profitocracy.Core.Domain.Model.Profiles.ValueObjects;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Categories;
using Profitocracy.Mobile.Utils;

namespace Profitocracy.Mobile.ViewModels.Home;

public class HomePageViewModel : BaseNotifyObject
{
    private string _profileName = string.Empty;
    
    private decimal _balance;
    private decimal _totalActualAmount;
    private decimal _totalPlannedAmount;
    private decimal _totalSavedAmount;
    private decimal _todayActualAmount;
    private decimal _todayPlannedAmount;
    private decimal _balanceForTomorrow;
    private decimal _mainActualAmount;
    private decimal _mainPlannedAmount;
    private decimal _secondaryActualAmount;
    private decimal _secondaryPlannedAmount;
    private decimal _savedActualAmount;
    private decimal _savedPlannedAmount;
    
    private float _totalBalanceRatio;
    private float _todayBalanceRatio;
    private float _mainExpensesRatio;
    private float _secondaryExpensesRatio;
    private float _savedRatio;
    
    private string _dateFrom = string.Empty;
    private string _dateTo = string.Empty;

    private bool _isDisplayNoCategories;
    private bool _isRefreshing = true;
    
    private readonly ICalculationService _calculationService;

    public Guid ProfileId { get; private set; }
    
    public string ProfileName
    {
        get => _profileName;
        set => SetProperty(ref _profileName, value);
    }
    
    public decimal Balance
    {
        get => _balance;
        set => SetProperty(ref _balance, value);
    }
    
    public decimal TotalActualAmount
    {
        get => _totalActualAmount;
        set => SetProperty(ref _totalActualAmount, value);
    }
    
    public decimal TotalPlannedAmount
    {
        get => _totalPlannedAmount;
        set => SetProperty(ref _totalPlannedAmount, value);
    }
    
    public decimal TotalSavedAmount
    {
        get => _totalSavedAmount;
        set => SetProperty(ref _totalSavedAmount, value);
    }
    
    public decimal TodayActualAmount
    {
        get => _todayActualAmount;
        set => SetProperty(ref _todayActualAmount, value);
    }
    
    public decimal TodayPlannedAmount
    {
        get => _todayPlannedAmount;
        set => SetProperty(ref _todayPlannedAmount, value);
    }

    public decimal BalanceForTomorrow
    {
        get => _balanceForTomorrow;
        set => SetProperty(ref _balanceForTomorrow, value);
    }
    
    public decimal MainActualAmount
    {
        get => _mainActualAmount;
        set => SetProperty(ref _mainActualAmount, value);
    }
    
    public decimal MainPlannedAmount
    {
        get => _mainPlannedAmount;
        set => SetProperty(ref _mainPlannedAmount, value);
    }
    
    public decimal SecondaryActualAmount
    {
        get => _secondaryActualAmount;
        set => SetProperty(ref _secondaryActualAmount, value);
    }
    
    public decimal SecondaryPlannedAmount
    {
        get => _secondaryPlannedAmount;
        set => SetProperty(ref _secondaryPlannedAmount, value);
    }
    
    public decimal SavedActualAmount
    {
        get => _savedActualAmount;
        set => SetProperty(ref _savedActualAmount, value);
    }
    
    public decimal SavedPlannedAmount
    {
        get => _savedPlannedAmount;
        set => SetProperty(ref _savedPlannedAmount, value);
    }
    
    public float TotalBalanceRatio
    {
        get => _totalBalanceRatio;
        private set => SetProperty(ref _totalBalanceRatio, value);
    }

    public float TodayBalanceRatio
    {
        get => _todayBalanceRatio;
        private set => SetProperty(ref _todayBalanceRatio, value);
    }

    public float MainExpensesRatio
    {
        get => _mainExpensesRatio;
        private set => SetProperty(ref _mainExpensesRatio, value);
    }

    public float SecondaryExpensesRatio
    {
        get => _secondaryExpensesRatio;
        private set => SetProperty(ref _secondaryExpensesRatio, value);
    }

    public float SavedRatio
    {
        get => _savedRatio;
        private set => SetProperty(ref _savedRatio, value);
    }

    public string DateFrom
    {
        get => _dateFrom;
        private set => SetProperty(ref _dateFrom, value);
    }

    public string DateTo
    {
        get => _dateTo;
        private set => SetProperty(ref _dateTo, value);
    }
    
    public bool IsDisplayNoCategories
    {
        get => _isDisplayNoCategories;
        private set => SetProperty(ref _isDisplayNoCategories, value);
    }

    public bool IsRefreshing
    {
        get => _isRefreshing;
        set => SetProperty(ref _isRefreshing, value);
    }
    
    public ICommand RefreshCommand { get; private set; }
    
    public readonly ObservableCollection<CategoryExpenseModel> CategoriesExpenses = [];
    
    public HomePageViewModel(ICalculationService calculationService)
    {
        _calculationService = calculationService;
        RefreshCommand = new Command(
            execute: Refresh,
            canExecute: () => !IsRefreshing);
    }

    private async void Refresh()
    {
        try
        {
            await Initialize();
        }
        catch (Exception)
        {
            // Ignored
        }
    }
    
    public async Task Initialize()
    {
        var profile = await _calculationService.GetCurrentProfile();

        if (profile is null)
        {
            return;
        }

        ProfileId = profile.Id;
        ProfileName = profile.Name;
        Balance = NumberUtils.RoundDecimal(profile.Balance);
        TotalSavedAmount = profile.SavedBalance;
        DateFrom = profile.BillingPeriod.DateFrom.ToShortDateString();
        DateTo = profile.BillingPeriod.DateTo.ToShortDateString();
        
        InitializeExpenses(profile.Expenses);
        CategoriesExpenses.Clear();

        if (profile.CategoriesExpenses.Count > 0)
        {
            IsDisplayNoCategories = false;
            InitializeCategoriesExpenses(profile.CategoriesExpenses);
        }
        else
        {
            IsDisplayNoCategories = true;
        }
        
        IsRefreshing = false;
    }

    private void InitializeExpenses(ProfileExpenses expenses)
    {
        TotalActualAmount = NumberUtils.RoundDecimal(expenses.TotalBalance.ActualAmount);
        TotalPlannedAmount = NumberUtils.RoundDecimal(expenses.TotalBalance.PlannedAmount);
        TodayActualAmount = NumberUtils.RoundDecimal(expenses.TodayBalance.ActualAmount);
        TodayPlannedAmount = NumberUtils.RoundDecimal(expenses.TodayBalance.PlannedAmount);
        BalanceForTomorrow = NumberUtils.RoundDecimal(expenses.TomorrowBalance);
        MainActualAmount = NumberUtils.RoundDecimal(expenses.Main.ActualAmount);
        MainPlannedAmount = NumberUtils.RoundDecimal(expenses.Main.PlannedAmount);
        SecondaryActualAmount = NumberUtils.RoundDecimal(expenses.Secondary.ActualAmount);
        SecondaryPlannedAmount = NumberUtils.RoundDecimal(expenses.Secondary.PlannedAmount);
        SavedActualAmount = NumberUtils.RoundDecimal(expenses.Saved.ActualAmount);
        SavedPlannedAmount = NumberUtils.RoundDecimal(expenses.Saved.PlannedAmount);
        
        InitializeExpenseRatios(expenses);
    }
    
    private void InitializeExpenseRatios(ProfileExpenses expenses)
    {
        TotalBalanceRatio = GetExpenseRatio(expenses.TotalBalance);
        TodayBalanceRatio = GetExpenseRatio(expenses.TodayBalance);
        MainExpensesRatio = GetExpenseRatio(expenses.Main);
        SecondaryExpensesRatio = GetExpenseRatio(expenses.Secondary);
        SavedRatio = GetExpenseRatio(expenses.Saved);
    }

    private void InitializeCategoriesExpenses(List<ProfileCategory> categories)
    {
        foreach (var category in categories)
        {
            decimal? plannedAmount = null;
            float? ratio = null;
            
            var showRatio = category.PlannedAmount is not (null or 0);

            if (showRatio)
            {
                plannedAmount = category.PlannedAmount;
                ratio = GetCategoryRatio(category);
            }
            
            var categoryExpense = new CategoryExpenseModel(
                Id: category.Id,
                Name: category.Name, 
                ActualAmount: NumberUtils.RoundDecimal(category.ActualAmount),
                IsShowRatio: showRatio,
                PlannedAmount: plannedAmount,
                Ratio: ratio);
            
            CategoriesExpenses.Add(categoryExpense);
        }
    }
    
    private static float GetExpenseRatio(ProfileExpense expense)
    {
        if (expense.PlannedAmount == 0)
        {
            return 1;
        }

        return NumberUtils.GetFloatRatio(expense.ActualAmount, expense.PlannedAmount);
    }
    
    private static float GetCategoryRatio(ProfileCategory category)
    {
        if (category.PlannedAmount is null or 0)
        {
            return 1;
        }

        return NumberUtils.GetFloatRatio(category.ActualAmount, (decimal)category.PlannedAmount);
    }
}