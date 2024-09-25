using System.Collections.ObjectModel;
using Profitocracy.Core.Domain.Abstractions.Services;
using Profitocracy.Core.Domain.Model.Profiles.Entities;
using Profitocracy.Core.Domain.Model.Profiles.ValueObjects;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models;
using Profitocracy.Mobile.Utils;

namespace Profitocracy.Mobile.ViewModels.Home;

public class HomePageViewModel : BaseNotifyObject
{
    private string _profileName = string.Empty;
    
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
    
    private string _dateFrom = string.Empty;
    private string _dateTo = string.Empty;

    private bool _isDisplayNoCategories;
    
    private readonly IProfileService _profileService;

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
    
    public decimal DailyFromActualActualAmount
    {
        get => _dailyFromActualActualAmount;
        set => SetProperty(ref _dailyFromActualActualAmount, value);
    }
    
    public decimal DailyFromActualPlannedAmount
    {
        get => _dailyFromActualPlannedAmount;
        set => SetProperty(ref _dailyFromActualPlannedAmount, value);
    }
    
    public decimal DailyFromInitialActualAmount
    {
        get => _dailyFromInitialActualAmount;
        set => SetProperty(ref _dailyFromInitialActualAmount, value);
    }
    
    public decimal DailyFromInitialPlannedAmount
    {
        get => _dailyFromInitialPlannedAmount;
        set => SetProperty(ref _dailyFromInitialPlannedAmount, value);
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

    public float DailyFromActualRatio
    {
        get => _dailyFromActualRatio;
        private set => SetProperty(ref _dailyFromActualRatio, value);
    }

    public float DailyFromInitialRatio
    {
        get => _dailyFromInitialRatio;
        private set => SetProperty(ref _dailyFromInitialRatio, value);
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
        set => SetProperty(ref _isDisplayNoCategories, value);
    }
    
    public ObservableCollection<DisplayCategoryExpense> CategoriesExpenses = [];
    
    public HomePageViewModel(IProfileService profileService)
    {
        _profileService = profileService;
    }

    public async void Initialize()
    {
        var profile = await _profileService.GetCurrentProfile();

        if (profile is null)
        {
            return;
        }

        ProfileName = profile.Name;
        Balance = NumberUtils.RoundDecimal(profile.Balance);
        TotalSavedAmount = profile.SavedBalance;
        DateFrom = profile.BillingPeriod.DateFrom.ToShortDateString();
        DateTo = profile.BillingPeriod.DateTo.ToShortDateString();
        
        InitializeExpenses(profile.Expenses);

        if (profile.CategoriesBalances.Count > 0)
        {
            IsDisplayNoCategories = false;
            InitializeCategoriesExpenses(profile.CategoriesBalances);
        }
        else
        {
            IsDisplayNoCategories = true;
        }
    }

    private void InitializeExpenses(ProfileExpenses expenses)
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
    
    private void InitializeExpenseRatios(ProfileExpenses expenses)
    {
        TotalBalanceRatio = GetExpenseRatio(expenses.TotalBalance.ActualAmount, expenses.TotalBalance.PlannedAmount);
        DailyFromActualRatio = GetExpenseRatio(expenses.DailyFromActualBalance.ActualAmount, expenses.DailyFromActualBalance.PlannedAmount);
        DailyFromInitialRatio = GetExpenseRatio(expenses.DailyFromInitialBalance.ActualAmount, expenses.DailyFromInitialBalance.PlannedAmount);
        MainExpensesRatio = GetExpenseRatio(expenses.Main.ActualAmount, expenses.Main.PlannedAmount);
        SecondaryExpensesRatio = GetExpenseRatio(expenses.Secondary.ActualAmount, expenses.Secondary.PlannedAmount);
        SavedRatio = GetExpenseRatio(expenses.Saved.ActualAmount, expenses.Saved.PlannedAmount);
    }

    private void InitializeCategoriesExpenses(List<ProfileCategory> expenses)
    {
        CategoriesExpenses.Clear();
        
        foreach (var expense in expenses)
        {
            DisplayCategoryExpense categoryExpense;
            
            if (expense.PlannedAmount is null or 0)
            {
                categoryExpense = new DisplayCategoryExpense(
                    expense.Id,
                    expense.Name, 
                    NumberUtils.RoundDecimal(expense.ActualAmount),
                    false,
                    null, 
                    null);
            }
            else
            {
                categoryExpense = new DisplayCategoryExpense(
                    expense.Id,
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