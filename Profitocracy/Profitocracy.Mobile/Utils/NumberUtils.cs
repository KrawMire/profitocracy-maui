namespace Profitocracy.Mobile.Utils;

public static class NumberUtils
{
    public static decimal RoundDecimal(decimal? num, int decimals = 2)
    {
        if (num is null)
        {
            return 0;
        }
        
        return Math.Round((decimal)num, decimals);
    }
}