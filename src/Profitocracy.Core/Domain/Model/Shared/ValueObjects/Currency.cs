namespace Profitocracy.Core.Domain.Model.Shared.ValueObjects;

public struct Currency : IEquatable<Currency>
{
    public static class AvailableCurrencies
    {
        public static readonly Currency Usd = new("USD", "$");
        public static readonly Currency Eur = new("EUR", "\u20ac");
        public static readonly Currency Rub = new("RUB", "\u20bd");
        public static readonly Currency Rsd = new("RSD", "rsd.");
    }
    
    /// We force other layers of the project to use AvailableCurrencies
    /// instead of creating own currencies
    private Currency(string code, string symbol)
    {
        Code = code;
        Symbol = symbol;
    }
    
    public string Code { get; }
    public string Symbol { get; }
    
    public bool Equals(Currency cur)
    {
        return cur.Code == Code;
    }

    public static bool operator ==(Currency cur1, Currency cur2)
    {
        return cur1.Code.Equals(cur2.Code);
    }

    public static bool operator !=(Currency cur1, Currency cur2)
    {
        return !cur1.Code.Equals(cur2.Code);
    }
    
    public override bool Equals(object? obj)
    {
        return obj is Currency other && Equals(other);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Code, Symbol);
    }
}