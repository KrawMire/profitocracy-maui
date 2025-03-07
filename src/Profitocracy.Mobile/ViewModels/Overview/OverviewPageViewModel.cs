using LiveChartsCore;
using LiveChartsCore.SkiaSharpView;
using LiveChartsCore.SkiaSharpView.Drawing.Geometries;
using Profitocracy.Mobile.Abstractions;

namespace Profitocracy.Mobile.ViewModels.Overview;

public class OverviewPageViewModel : BaseNotifyObject
{
    public ISeries[] CartesianSeries { get; set; } = [
        new ColumnSeries<int>(3, 4, 2),
        new ColumnSeries<int>(4, 2, 6),
        new ColumnSeries<double, DiamondGeometry>(4, 3, 4)
    ];
    
    public ISeries[] PieSeries { get; set; } = [
        new PieSeries<double> { Values = [2] },
        new PieSeries<double> { Values = [4] },
        new PieSeries<double> { Values = [1] },
        new PieSeries<double> { Values = [4] },
        new PieSeries<double> { Values = [3] }
    ];
    
    public string PieChartTitle { get; set; } = "Pie Chart";
}