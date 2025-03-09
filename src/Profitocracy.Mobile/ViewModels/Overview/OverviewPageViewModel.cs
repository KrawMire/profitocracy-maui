using System.Collections.ObjectModel;
using LiveChartsCore;
using LiveChartsCore.SkiaSharpView;
using LiveChartsCore.SkiaSharpView.Drawing.Geometries;
using Profitocracy.Core.Domain.Abstractions.Services;
using Profitocracy.Core.Domain.Model.Shared.ValueObjects;
using Profitocracy.Core.Domain.Model.Summaries;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Resources.Strings;

namespace Profitocracy.Mobile.ViewModels.Overview;

public class OverviewPageViewModel : BaseNotifyObject
{
    private readonly ICalculationService _calculationService;
    
    private readonly ObservableCollection<decimal> _categoriesExpensesValues = [];
    private readonly ObservableCollection<string> _categoriesExpensesLabelsValues = [];
    private readonly ObservableCollection<decimal> _mainSpendingTypeExpenses = [];
    private readonly ObservableCollection<decimal> _secondarySpendingTypeExpenses = [];
    private readonly ObservableCollection<decimal> _savedSpendingTypeExpenses = [];
    private readonly ObservableCollection<decimal> _totalIncome = [];
    private readonly ObservableCollection<decimal> _totalExpense = [];
    private readonly ObservableCollection<decimal> _plannedCategoriesExpenses = [];
    private readonly ObservableCollection<string> _plannedCategoriesExpensesLabels = [];
    private readonly ObservableCollection<decimal> _actualCategoriesExpenses = [];
    private readonly ObservableCollection<decimal> _dailyExpensesValues = [];
    private readonly ObservableCollection<decimal> _weeklyExpensesValues = [];
    
    public OverviewPageViewModel(ICalculationService calculationService)
    {
        _calculationService = calculationService;

        CategoriesExpenses =
        [
            new ColumnSeries<decimal, RoundedRectangleGeometry, LabelGeometry>
            {
                Values = _categoriesExpensesValues
            }
        ];

        CategoriesExpensesLabels =
        [
            new Axis { Labels = _categoriesExpensesLabelsValues }
        ];

        SpendingTypeDistribution =
        [
            new PieSeries<decimal>
            {
                Values = _mainSpendingTypeExpenses,
                Name = AppResources.OverView_SpendingType_Main
            },
            new PieSeries<decimal>
            {
                Values = _secondarySpendingTypeExpenses,
                Name = AppResources.Overview_SpendingType_Secondary
            },
            new PieSeries<decimal>
            {
                Values = _savedSpendingTypeExpenses,
                Name = AppResources.Overview_SpendingType_Saved
            }
        ];

        IncomeAndExpense =
        [
            new PieSeries<decimal>
            {
                Values = _totalIncome,
                Name = AppResources.Overview_Income
            },
            new PieSeries<decimal>
            {
                Values = _totalExpense,
                Name = AppResources.Overview_Expense
            }
        ];

        PlannedAndActualCategoriesAmounts =
        [
            new ColumnSeries<decimal> { Values = _plannedCategoriesExpenses },
            new ColumnSeries<decimal> { Values = _actualCategoriesExpenses }
        ];

        PlannedAndActualCategoriesAmountsLabels =
        [
            new Axis { Labels = _plannedCategoriesExpensesLabels }
        ];

        DailyExpenses =
        [
            new LineSeries<decimal>
            {
                Values = _dailyExpensesValues,
                Fill = null,
                GeometryFill = null,
                GeometryStroke = null
            }
        ];

        WeeklyExpenses =
        [
            new LineSeries<decimal>
            {
                Values = _weeklyExpensesValues,
                Fill = null,
                GeometryFill = null,
                GeometryStroke = null
            }
        ];
    }
    
    public ISeries[] CategoriesExpenses { get; set; }
    public Axis[] CategoriesExpensesLabels { get; set; }
    public ISeries[] SpendingTypeDistribution { get; set; }
    public ISeries[] IncomeAndExpense { get; set; }
    public ISeries[] PlannedAndActualCategoriesAmounts { get; set; }
    public Axis[] PlannedAndActualCategoriesAmountsLabels { get; set; }
    public ISeries[] DailyExpenses { get; set; }
    public ISeries[] WeeklyExpenses { get; set; }

    public async Task Initialize()
    {
        var currentDay = DateTime.Now;
        var dateFrom = new DateTime(currentDay.Year, currentDay.Month, 1);
        var dateTo = new DateTime(
            currentDay.Year, 
            currentDay.Month, 
            day: DateTime.DaysInMonth(
                currentDay.Year, 
                currentDay.Month));
        
        var summary = await _calculationService.GetSummaryForPeriod(dateFrom, dateTo);
        
        InvalidateSeries();
        DistributeSummary(summary);
    }

    private void InvalidateSeries()
    {
        _categoriesExpensesValues.Clear();
        _categoriesExpensesLabelsValues.Clear();
        _mainSpendingTypeExpenses.Clear();
        _secondarySpendingTypeExpenses.Clear();
        _savedSpendingTypeExpenses.Clear();
        _totalIncome.Clear();
        _totalExpense.Clear();
        _plannedCategoriesExpenses.Clear();
        _actualCategoriesExpenses.Clear();
        _dailyExpensesValues.Clear();
        _weeklyExpensesValues.Clear();
    }

    private void DistributeSummary(Summary summary)
    {
        foreach (var categoryExpense in summary.CategoryExpenses.Values)
        {
            _categoriesExpensesValues.Add(categoryExpense.Amount);
            _categoriesExpensesLabelsValues.Add(categoryExpense.CategoryName);
        }

        _mainSpendingTypeExpenses.Add(summary.SpendingTypesExpenses[SpendingType.Main]);
        _secondarySpendingTypeExpenses.Add(summary.SpendingTypesExpenses[SpendingType.Secondary]);
        _savedSpendingTypeExpenses.Add(summary.SpendingTypesExpenses[SpendingType.Saved]);
        
        _totalExpense.Add(summary.TotalExpenses);
        _totalIncome.Add(summary.TotalIncome);
        
        foreach (var categoryExpectation in summary.CategoryExpenseExpectations.Values)
        {
            _plannedCategoriesExpenses.Add(categoryExpectation.PlannedAmount);
            _actualCategoriesExpenses.Add(categoryExpectation.ActualAmount);
            _plannedCategoriesExpensesLabels.Add(categoryExpectation.CategoryName);
        }
    }
}