using Profitocracy.Core.Domain.Model.Shared.ValueObjects;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Mappers;

internal static class CurrencyMapper
{
    public static readonly Dictionary<string, Currency> Currencies = new()
    {
        { Currency.AvailableCurrencies.Usd.Code, Currency.AvailableCurrencies.Usd },
        { Currency.AvailableCurrencies.Euro.Code, Currency.AvailableCurrencies.Euro },
        { Currency.AvailableCurrencies.Rub.Code, Currency.AvailableCurrencies.Rub },
        { Currency.AvailableCurrencies.Rsd.Code, Currency.AvailableCurrencies.Rsd }
    };
}