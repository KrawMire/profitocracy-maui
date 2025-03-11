using Profitocracy.Core.Domain.Model.Shared.ValueObjects;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Mappers;

internal static class CurrencyMapper
{
    public static readonly Dictionary<string, Currency> Currencies = new()
    {
        { Currency.AvailableCurrencies.Usd.Code, Currency.AvailableCurrencies.Usd },
        { Currency.AvailableCurrencies.Eur.Code, Currency.AvailableCurrencies.Eur },
        { Currency.AvailableCurrencies.Rub.Code, Currency.AvailableCurrencies.Rub },
        { Currency.AvailableCurrencies.Rsd.Code, Currency.AvailableCurrencies.Rsd }
    };
}