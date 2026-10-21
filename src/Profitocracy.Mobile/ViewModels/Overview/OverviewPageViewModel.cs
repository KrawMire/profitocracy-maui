using Profitocracy.Core.Domain.Abstractions.Services;
using Profitocracy.Core.Domain.Model.Shared.ValueObjects;
using Profitocracy.Core.Domain.Model.Transactions;
using Profitocracy.Core.Domain.Model.Transactions.ValueObjects;
using Profitocracy.Core.Persistence;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Constants;
using Profitocracy.Mobile.Models.Categories;
using Profitocracy.Mobile.Resources.Strings;
using Profitocracy.Mobile.Utils;
using Profitocracy.Mobile.Views.Overview.Controls;
using System.Collections.ObjectModel;
using System.Globalization;

namespace Profitocracy.Mobile.ViewModels.Overview;

/// <summary>
/// Period the insights are calculated for
/// </summary>
public enum InsightsPeriod
{
    Week,
    Month,
    Year,
    Custom
}

public class OverviewPageViewModel : BaseNotifyObject
{
    private const decimal MainShare = 0.5m;
    private const decimal SecondaryShare = 0.3m;
    private const decimal SavedShare = 0.2m;
    private const int MaxDailyBars = 62;
    private const int MaxNoteCategories = 2;

    private readonly ICalculationService _calculationService;
    private readonly ITransactionRepository _transactionRepository;
    private readonly ICategoryRepository _categoryRepository;

    private InsightsPeriod _period = InsightsPeriod.Month;
    private DateTime _dateFrom;
    private DateTime _dateTo;
    private string _dateRange = string.Empty;

    private bool _hasIncome;
    private string _keptPercent = string.Empty;
    private string _keptText = string.Empty;
    private string _income = string.Empty;
    private string _spent = string.Empty;
    private string _putAside = string.Empty;
    private double _incomeRatio;
    private double _spentRatio;
    private double _putAsideRatio;

    private string _usedTotal = string.Empty;
    private int _mainSeats;
    private int _secondarySeats;
    private int _savedSeats;
    private string _mainLegend = string.Empty;
    private string _secondaryLegend = string.Empty;
    private string _savedLegend = string.Empty;

    private string _barsTitle = AppResources.Insights_DayByDay;
    private IReadOnlyList<SpendingBar> _bars = [];
    private decimal _barsAverage;
    private string _barsAverageText = string.Empty;
    private string _barsNote = string.Empty;

    private bool _hasLimits;

    public OverviewPageViewModel(
        ICalculationService calculationService,
        ITransactionRepository transactionRepository,
        ICategoryRepository categoryRepository)
    {
        _calculationService = calculationService;
        _transactionRepository = transactionRepository;
        _categoryRepository = categoryRepository;
    }

    public ObservableCollection<CategoryLimitModel> Limits { get; } = [];

    public InsightsPeriod Period
    {
        get => _period;
        private set
        {
            SetProperty(ref _period, value);
            OnPropertyChanged(nameof(IsWeek));
            OnPropertyChanged(nameof(IsMonth));
            OnPropertyChanged(nameof(IsYear));
            OnPropertyChanged(nameof(IsCustom));
        }
    }

    public bool IsWeek => Period == InsightsPeriod.Week;
    public bool IsMonth => Period == InsightsPeriod.Month;
    public bool IsYear => Period == InsightsPeriod.Year;
    public bool IsCustom => Period == InsightsPeriod.Custom;

    public DateTime DateFrom
    {
        get => _dateFrom;
        private set => SetProperty(ref _dateFrom, value);
    }

    public DateTime DateTo
    {
        get => _dateTo;
        private set => SetProperty(ref _dateTo, value);
    }

    /// <summary>
    /// Covered days of the period, e.g. "01–11.03.2025".
    /// </summary>
    public string DateRange
    {
        get => _dateRange;
        private set => SetProperty(ref _dateRange, value);
    }

    public bool HasIncome
    {
        get => _hasIncome;
        private set
        {
            SetProperty(ref _hasIncome, value);
            OnPropertyChanged(nameof(HasNoIncome));
        }
    }

    public bool HasNoIncome => !HasIncome;

    public string KeptPercent
    {
        get => _keptPercent;
        private set => SetProperty(ref _keptPercent, value);
    }

    public string KeptText
    {
        get => _keptText;
        private set => SetProperty(ref _keptText, value);
    }

    public string Income
    {
        get => _income;
        private set => SetProperty(ref _income, value);
    }

    public string Spent
    {
        get => _spent;
        private set => SetProperty(ref _spent, value);
    }

    public string PutAside
    {
        get => _putAside;
        private set => SetProperty(ref _putAside, value);
    }

    public double IncomeRatio
    {
        get => _incomeRatio;
        private set => SetProperty(ref _incomeRatio, value);
    }

    public double SpentRatio
    {
        get => _spentRatio;
        private set => SetProperty(ref _spentRatio, value);
    }

    public double PutAsideRatio
    {
        get => _putAsideRatio;
        private set => SetProperty(ref _putAsideRatio, value);
    }

    public string UsedTotal
    {
        get => _usedTotal;
        private set => SetProperty(ref _usedTotal, value);
    }

    public int MainSeats
    {
        get => _mainSeats;
        private set => SetProperty(ref _mainSeats, value);
    }

    public int SecondarySeats
    {
        get => _secondarySeats;
        private set => SetProperty(ref _secondarySeats, value);
    }

    public int SavedSeats
    {
        get => _savedSeats;
        private set => SetProperty(ref _savedSeats, value);
    }

    public string MainLegend
    {
        get => _mainLegend;
        private set => SetProperty(ref _mainLegend, value);
    }

    public string SecondaryLegend
    {
        get => _secondaryLegend;
        private set => SetProperty(ref _secondaryLegend, value);
    }

    public string SavedLegend
    {
        get => _savedLegend;
        private set => SetProperty(ref _savedLegend, value);
    }

    public string BarsTitle
    {
        get => _barsTitle;
        private set => SetProperty(ref _barsTitle, value);
    }

    public IReadOnlyList<SpendingBar> Bars
    {
        get => _bars;
        private set => SetProperty(ref _bars, value);
    }

    public decimal BarsAverage
    {
        get => _barsAverage;
        private set => SetProperty(ref _barsAverage, value);
    }

    public string BarsAverageText
    {
        get => _barsAverageText;
        private set => SetProperty(ref _barsAverageText, value);
    }

    public string BarsNote
    {
        get => _barsNote;
        private set => SetProperty(ref _barsNote, value);
    }

    public bool HasLimits
    {
        get => _hasLimits;
        private set
        {
            SetProperty(ref _hasLimits, value);
            OnPropertyChanged(nameof(HasNoLimits));
        }
    }

    public bool HasNoLimits => !HasLimits;

    public async Task Initialize(OverviewFiltersPageViewModel filters)
    {
        if (filters.IsApplied)
        {
            Period = InsightsPeriod.Custom;
            DateFrom = filters.DateFrom;
            DateTo = filters.DateTo;
        }
        else if (Period == InsightsPeriod.Custom)
        {
            Period = InsightsPeriod.Month;
        }

        await Update();
    }

    public Task ChangePeriod(InsightsPeriod period)
    {
        Period = period;
        return Update();
    }

    private async Task Update()
    {
        var profile = await _calculationService.GetCurrentProfile();

        if (profile is null)
        {
            return;
        }

        var today = DateTime.Today;

        switch (Period)
        {
            case InsightsPeriod.Week:
                var weekStart = today.AddDays(-(((int)today.DayOfWeek + 6) % 7));
                DateFrom = weekStart;
                DateTo = EndOfDay(weekStart.AddDays(6));
                break;
            case InsightsPeriod.Month:
                DateFrom = profile.BillingPeriod.DateFrom;
                DateTo = profile.BillingPeriod.DateTo;
                break;
            case InsightsPeriod.Year:
                DateFrom = new DateTime(today.Year, 1, 1);
                DateTo = EndOfDay(new DateTime(today.Year, 12, 31));
                break;
            case InsightsPeriod.Custom:
            default:
                break;
        }

        var lastShownDay = DateTo.Date > today && DateFrom.Date <= today ? today : DateTo.Date;
        DateRange = DateFrom.Year == lastShownDay.Year
            ? $"{DateFrom:dd.MM}–{lastShownDay:dd.MM.yyyy}"
            : $"{DateFrom:dd.MM.yyyy}–{lastShownDay:dd.MM.yyyy}";

        var symbol = profile.Settings.Currency.Symbol;
        var transactions = await _transactionRepository.GetForPeriod(profile.Id, DateFrom, DateTo);
        var categories = await _categoryRepository.GetAllByProfileId(profile.Id);

        var income = Sum(transactions, t => t.Type == TransactionType.Income);
        var spent = Sum(transactions, t => t.Type == TransactionType.Expense && t.SpendingType != SpendingType.Saved);
        var main = Sum(transactions, t => t.Type == TransactionType.Expense && t.SpendingType == SpendingType.Main);
        var secondary = Sum(transactions, t => t.Type == TransactionType.Expense && t.SpendingType == SpendingType.Secondary);
        var saved = Sum(transactions, t => t.Type == TransactionType.Expense && t.SpendingType == SpendingType.Saved);

        // The month of the profile also carries the balance of the previous one,
        // so its budget matches the one on the home page
        var budget = Period == InsightsPeriod.Month
            ? profile.Expenses.TotalBalance.PlannedAmount
            : income;

        InitializeKept(budget, income, spent, saved, symbol);
        InitializeChamber(budget, main, secondary, saved, symbol);
        InitializeBars(transactions, budget, symbol);
        InitializeLimits(transactions, categories, symbol);
    }

    private void InitializeKept(decimal budget, decimal income, decimal spent, decimal saved, string symbol)
    {
        HasIncome = budget > 0;

        var kept = HasIncome ? (budget - spent - saved) / budget : 0;
        var keptPercent = FormatPercent(kept);

        KeptPercent = HasIncome ? keptPercent : "—";
        KeptText = HasIncome
            ? string.Format(AppResources.Insights_KeptText, keptPercent)
            : AppResources.Insights_NoIncome;

        Income = NumberUtils.FormatMoney(income, symbol);
        Spent = NumberUtils.FormatMoney(spent, symbol);
        PutAside = NumberUtils.FormatMoney(saved, symbol);

        IncomeRatio = HasIncome ? (double)(income / budget) : 0;
        SpentRatio = HasIncome ? (double)(spent / budget) : 0;
        PutAsideRatio = HasIncome ? (double)(saved / budget) : 0;
    }

    private void InitializeChamber(decimal budget, decimal main, decimal secondary, decimal saved, string symbol)
    {
        UsedTotal = string.Format(AppResources.Insights_Used, NumberUtils.FormatMoney(main + secondary + saved, symbol));

        var mainShare = Share(main, budget * MainShare);
        var secondaryShare = Share(secondary, budget * SecondaryShare);
        var savedShare = Share(saved, budget * SavedShare);

        MainSeats = Seats(mainShare, ChamberChartView.MainSeats);
        SecondarySeats = Seats(secondaryShare, ChamberChartView.SecondarySeats);
        SavedSeats = Seats(savedShare, ChamberChartView.SavedSeats);

        MainLegend = string.Format(AppResources.Insights_OfNeeds, NumberUtils.FormatMoney(main, symbol), FormatPercent(mainShare));
        SecondaryLegend = string.Format(AppResources.Insights_OfWants, NumberUtils.FormatMoney(secondary, symbol), FormatPercent(secondaryShare));
        SavedLegend = string.Format(AppResources.Insights_OfGoal, NumberUtils.FormatMoney(saved, symbol), FormatPercent(savedShare));
    }

    private void InitializeBars(List<Transaction> transactions, decimal budget, string symbol)
    {
        var today = DateTime.Today;
        var days = (DateTo.Date - DateFrom.Date).Days + 1;
        var isDaily = days <= MaxDailyBars;
        var step = isDaily ? 1 : 7;
        var count = (days + step - 1) / step;

        var spendings = transactions
            .Where(t => t.Type == TransactionType.Expense && t.SpendingType != SpendingType.Saved)
            .ToList();

        var bars = new List<SpendingBar>(count);
        var barTransactions = new List<List<Transaction>>(count);

        for (var i = 0; i < count; i++)
        {
            var start = DateFrom.Date.AddDays(i * step);
            var end = start.AddDays(step);
            var inBar = spendings.Where(t => t.Timestamp >= start && t.Timestamp < end).ToList();
            var isToday = start <= today && today < end;

            var label = i == 0
                ? start.ToString("d MMM", CultureInfo.CurrentCulture)
                : isToday
                    ? $"{start.Day} · {AppResources.Insights_TodayMark}"
                    : i == count - 1
                        ? start.Day.ToString(CultureInfo.CurrentCulture)
                        : string.Empty;

            bars.Add(new SpendingBar(inBar.Sum(t => t.Amount), start > today, label));
            barTransactions.Add(inBar);
        }

        BarsTitle = isDaily ? AppResources.Insights_DayByDay : AppResources.Insights_WeekByWeek;
        BarsAverage = count > 0 ? budget / count : 0;
        BarsAverageText = BarsAverage > 0
            ? string.Format(
                isDaily ? AppResources.Insights_PerDay : AppResources.Insights_PerWeek,
                NumberUtils.FormatMoney(BarsAverage, symbol, decimals: 0))
            : string.Empty;

        var biggest = bars.Select((b, i) => (Bar: b, Index: i)).MaxBy(b => b.Bar.Amount);
        BarsNote = biggest.Bar is not null && biggest.Bar.Amount > BarsAverage && BarsAverage > 0
            ? $"{NumberUtils.FormatMoneyCompact(biggest.Bar.Amount, symbol)} · {DescribeSpending(barTransactions[biggest.Index])}"
            : string.Empty;

        Bars = bars;
    }

    private void InitializeLimits(List<Transaction> transactions, List<Core.Domain.Model.Categories.Category> categories, string symbol)
    {
        var periodDays = (DateTo.Date - DateFrom.Date).Days + 1;
        var monthDays = DateTime.DaysInMonth(DateFrom.Year, DateFrom.Month);

        // Limits are monthly, other periods get a proportional limit
        var limitScale = Period == InsightsPeriod.Month ? 1m : (decimal)periodDays / monthDays;

        var rows = categories
            .Select(c => (
                c.Name,
                Actual: transactions
                    .Where(t => t.Type == TransactionType.Expense && t.Category?.Id == c.Id)
                    .Sum(t => t.Amount),
                Limit: c.PlannedAmount is > 0 ? Math.Round(c.PlannedAmount.Value * limitScale, 2) : (decimal?)null))
            .Where(r => r.Actual > 0 || r.Limit is not null)
            .OrderByDescending(r => r.Actual)
            .ToList();

        var scale = rows.Count > 0
            ? rows.Max(r => Math.Max(r.Actual, r.Limit ?? 0))
            : 0;

        Limits.Clear();

        foreach (var row in rows)
        {
            Limits.Add(new CategoryLimitModel
            {
                Name = row.Name,
                Actual = NumberUtils.FormatMoney(row.Actual, symbol),
                Limit = row.Limit is null
                    ? AppResources.Insights_NoLimitLower
                    : string.Format(AppResources.Insights_OfLimit, NumberUtils.FormatMoneyCompact(row.Limit.Value, symbol)),
                Progress = scale > 0 ? (double)(row.Actual / scale) : 0,
                Mark = row.Limit is null || scale <= 0 ? -1 : (double)(row.Limit.Value / scale),
                IsOver = row.Limit is not null && row.Actual > row.Limit,
            });
        }

        HasLimits = Limits.Count > 0;
    }

    /// <summary>
    /// What the money of a bar was spent on: its categories, or descriptions without them.
    /// </summary>
    private static string DescribeSpending(List<Transaction> transactions)
    {
        var names = transactions
            .OrderByDescending(t => t.Amount)
            .Select(t => t.Category?.Name ?? t.Description)
            .Where(n => !string.IsNullOrWhiteSpace(n))
            .Distinct()
            .Take(MaxNoteCategories);

        return string.Join(" + ", names);
    }

    private static decimal Sum(List<Transaction> transactions, Func<Transaction, bool> predicate)
        => transactions.Where(predicate).Sum(t => t.Amount);

    private static decimal Share(decimal actual, decimal planned)
        => planned > 0 ? actual / planned : 0;

    private static int Seats(decimal share, int seats)
        => (int)Math.Round(Math.Clamp(share, 0, 1) * seats, MidpointRounding.AwayFromZero);

    private static string FormatPercent(decimal ratio)
        => ratio.ToString("P0", CultureInfo.CurrentCulture);

    private static DateTime EndOfDay(DateTime date)
        => new(
            date.Year,
            date.Month,
            date.Day,
            TimeConstants.MaxHours,
            TimeConstants.MaxMinutes,
            TimeConstants.MaxSeconds,
            TimeConstants.MaxMilliseconds);
}
