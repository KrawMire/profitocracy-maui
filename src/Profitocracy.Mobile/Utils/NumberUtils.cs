namespace Profitocracy.Mobile.Utils;

public static class NumberUtils
{
    public static decimal RoundDecimal(decimal? num, int decimals = 2)
    {
        return num is null ? 0 : Math.Round((decimal)num, decimals);
    }
}