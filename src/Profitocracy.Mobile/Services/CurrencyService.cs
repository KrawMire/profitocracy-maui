using Profitocracy.Core.Domain.Model.Shared.ValueObjects;
using Profitocracy.Mobile.Resources.Strings;

namespace Profitocracy.Mobile.Services;

public class CurrencyService
{
    public static readonly Dictionary<string, string> CurrencyNames = new();

    static CurrencyService()
    {
        CurrencyNames.Add(Currency.AvailableCurrencies.Rub.Code, AppResources.Currencies_RussianRuble);
        CurrencyNames.Add(Currency.AvailableCurrencies.Rsd.Code, AppResources.Currencies_SerbianDinar);
        CurrencyNames.Add(Currency.AvailableCurrencies.Usd.Code, AppResources.Currencies_UsDollar);
        CurrencyNames.Add(Currency.AvailableCurrencies.Eur.Code, AppResources.Currencies_EuropeanEuro);
    }
}