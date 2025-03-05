namespace Profitocracy.Mobile.Utils;

/// <summary>
/// Contains common methods for working with numbers
/// </summary>
public static class NumberUtils
{
    /// <summary>
    /// Round decimal to a specified amount of decimals.
    /// </summary>
    /// <param name="num">Number to round</param>
    /// <param name="decimals">Decimals places</param>
    /// <returns>Rounded decimal if num is not null, otherwise, zero</returns>
    public static decimal RoundDecimal(decimal? num, int decimals = 2) 
        => num is null 
            ? decimal.Zero 
            : Math.Round((decimal)num, decimals);

    /// <summary>
    /// Get ratio between two decimal numbers.
    /// Ratio is represented with float value.
    /// </summary>
    /// <param name="val1">First value</param>
    /// <param name="val2">Second value</param>
    /// <returns>Ratio between two decimal numbers</returns>
    public static float GetFloatRatio(decimal val1, decimal val2) 
        => (float)(val1 / val2);
}