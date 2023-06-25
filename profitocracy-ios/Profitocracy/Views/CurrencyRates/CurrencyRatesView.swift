//
//  CurrencyRatesView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 25.06.23.
//

import SwiftUI

struct CurrencyRatesView: View {
    @ObservedObject var currencyRatesState: CurrencyRatesState
    @ObservedObject var appSettings: AppSettings
    
    var body: some View {
        NavigationStack {
            List(currencyRatesState.currencyRates) { rate in
                CurrencyRateCardView(currencyRate: rate, baseCurrency: appSettings.mainCurrency)
            }
            .navigationTitle("Currency Rates")
        }
    }
}

struct CurrencyRatesView_Preview: PreviewProvider {
    static var previews: some View {
        CurrencyRatesView(
            currencyRatesState: CurrencyRatesState(
                currencyRates: [
                    CurrencyRate(
                        currency: Currency(
                            name: "US Dollar",
                            code: "USD",
                            symbol: "$"
                        ),
                        rate: 0.12
                    ),
                    CurrencyRate(
                        currency: Currency(
                            name: "European Euro",
                            code: "EUR",
                            symbol: "€"
                        ),
                        rate: 0.11
                    ),
                ]
            ),
            appSettings: AppSettings(
                categories: [],
                anchorDays: [],
                theme: .light,
                mainCurrency: Currency(
                    name: "Russian Ruble",
                    code: "RUB",
                    symbol: "₽"
                ),
                isSetup: true
            )
        )
    }
}
