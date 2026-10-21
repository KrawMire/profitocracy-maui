namespace Profitocracy.Mobile.Views.Overview.Controls;

/// <summary>
/// "Parliament" of 100 seats split 50 / 30 / 20 between main, secondary and saved.
/// Filled seats show which part of every budget is already used.
/// </summary>
public class ChamberChartView : GraphicsView
{
    // Size of the chart in the design, the drawing is scaled to the actual size
    private const float DesignWidth = 180;
    private const float DesignHeight = 94;
    private const float SeatRadius = 3.5f;

    private static readonly float[] Radii = [43, 54, 65, 76, 87];
    private static readonly int[] RowSeats = [13, 17, 20, 23, 27];

    public const int MainSeats = 50;
    public const int SecondarySeats = 30;
    public const int SavedSeats = 20;

    private static readonly List<PointF> Seats = BuildSeats();

    public ChamberChartView()
    {
        InputTransparent = true;
        BackgroundColor = Colors.Transparent;
        WidthRequest = DesignWidth;
        HeightRequest = DesignHeight;
        Drawable = new ChamberDrawable(this);
    }

    public static readonly BindableProperty MainUsedProperty = CreateProperty(nameof(MainUsed), typeof(int), 0);
    public static readonly BindableProperty SecondaryUsedProperty = CreateProperty(nameof(SecondaryUsed), typeof(int), 0);
    public static readonly BindableProperty SavedUsedProperty = CreateProperty(nameof(SavedUsed), typeof(int), 0);
    public static readonly BindableProperty MainColorProperty = CreateProperty(nameof(MainColor), typeof(Color), Colors.Gray);
    public static readonly BindableProperty MainTintProperty = CreateProperty(nameof(MainTint), typeof(Color), Colors.LightGray);
    public static readonly BindableProperty SecondaryColorProperty = CreateProperty(nameof(SecondaryColor), typeof(Color), Colors.Gray);
    public static readonly BindableProperty SecondaryTintProperty = CreateProperty(nameof(SecondaryTint), typeof(Color), Colors.LightGray);
    public static readonly BindableProperty SavedColorProperty = CreateProperty(nameof(SavedColor), typeof(Color), Colors.Gray);
    public static readonly BindableProperty SavedTintProperty = CreateProperty(nameof(SavedTint), typeof(Color), Colors.LightGray);

    /// <summary>
    /// Used seats of the 50 main ones.
    /// </summary>
    public int MainUsed
    {
        get => (int)GetValue(MainUsedProperty);
        set => SetValue(MainUsedProperty, value);
    }

    /// <summary>
    /// Used seats of the 30 secondary ones.
    /// </summary>
    public int SecondaryUsed
    {
        get => (int)GetValue(SecondaryUsedProperty);
        set => SetValue(SecondaryUsedProperty, value);
    }

    /// <summary>
    /// Used seats of the 20 saved ones.
    /// </summary>
    public int SavedUsed
    {
        get => (int)GetValue(SavedUsedProperty);
        set => SetValue(SavedUsedProperty, value);
    }

    public Color MainColor
    {
        get => (Color)GetValue(MainColorProperty);
        set => SetValue(MainColorProperty, value);
    }

    public Color MainTint
    {
        get => (Color)GetValue(MainTintProperty);
        set => SetValue(MainTintProperty, value);
    }

    public Color SecondaryColor
    {
        get => (Color)GetValue(SecondaryColorProperty);
        set => SetValue(SecondaryColorProperty, value);
    }

    public Color SecondaryTint
    {
        get => (Color)GetValue(SecondaryTintProperty);
        set => SetValue(SecondaryTintProperty, value);
    }

    public Color SavedColor
    {
        get => (Color)GetValue(SavedColorProperty);
        set => SetValue(SavedColorProperty, value);
    }

    public Color SavedTint
    {
        get => (Color)GetValue(SavedTintProperty);
        set => SetValue(SavedTintProperty, value);
    }

    private static BindableProperty CreateProperty(string name, Type type, object defaultValue)
        => BindableProperty.Create(
            name,
            type,
            typeof(ChamberChartView),
            defaultValue,
            propertyChanged: (bindable, _, _) => ((ChamberChartView)bindable).Invalidate());

    /// <summary>
    /// Seats on five arcs, ordered from the left end of the chamber to the right one,
    /// outer rows first, so every bloc takes a wedge of the half circle.
    /// </summary>
    private static List<PointF> BuildSeats()
    {
        var seats = new List<(float Angle, float Radius, PointF Point)>();
        var center = new PointF(DesignWidth / 2, DesignWidth / 2);

        for (var row = 0; row < Radii.Length; row++)
        {
            var count = RowSeats[row];

            for (var i = 0; i < count; i++)
            {
                var angle = MathF.PI * (1 - (float)i / (count - 1));
                var point = new PointF(
                    center.X + Radii[row] * MathF.Cos(angle),
                    center.Y - Radii[row] * MathF.Sin(angle));

                seats.Add((angle, Radii[row], point));
            }
        }

        return seats
            .OrderByDescending(s => s.Angle)
            .ThenByDescending(s => s.Radius)
            .Select(s => s.Point)
            .ToList();
    }

    private sealed class ChamberDrawable(ChamberChartView view) : IDrawable
    {
        public void Draw(ICanvas canvas, RectF dirtyRect)
        {
            var scale = Math.Min(dirtyRect.Width / DesignWidth, dirtyRect.Height / DesignHeight);

            DrawBloc(canvas, scale, 0, MainSeats, view.MainUsed, view.MainColor, view.MainTint);
            DrawBloc(canvas, scale, MainSeats, SecondarySeats, view.SecondaryUsed, view.SecondaryColor, view.SecondaryTint);
            DrawBloc(canvas, scale, MainSeats + SecondarySeats, SavedSeats, view.SavedUsed, view.SavedColor, view.SavedTint);
        }

        private static void DrawBloc(ICanvas canvas, float scale, int start, int count, int used, Color on, Color off)
        {
            for (var i = 0; i < count; i++)
            {
                var seat = Seats[start + i];

                canvas.FillColor = i < used ? on : off;
                canvas.FillCircle(seat.X * scale, seat.Y * scale, SeatRadius * scale);
            }
        }
    }
}
