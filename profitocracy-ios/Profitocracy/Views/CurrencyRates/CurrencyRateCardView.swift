//
//  CurrencyRateCardView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 25.06.23.
//

import SwiftUI

struct CurrencyRateCardView: View {
    var currencyRate: CurrencyRate
    var baseCurrency: Currency
    
    var body: some View {
        VStack {
            HStack() {
                Text(currencyRate.currency.name)
                    .font(.title3)
                    .fontWeight(.bold)
                Spacer()
                Text(currencyRate.currency.symbol)
                    .font(.title3)
                    .fontWeight(.bold)
                
            }
            Text("1 \(baseCurrency.code) = \(roundFloatString(currencyRate.rate)) \(currencyRate.currency.code)")
                .font(.headline)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding()
    }
}

struct CurrencyRateCardView_Preview: PreviewProvider {
    static var previews: some View {
        CurrencyRateCardView(
            currencyRate: CurrencyRate(
                currency: Currency(
                    name: "US Dollar",
                    code: "USD",
                    symbol: "$"
                ),
                rate: 0.22
            ),
            baseCurrency: Currency(
                name: "Russian Ruble",
                code: "RUB",
                symbol: "₽"
            )
        )
    }
}
