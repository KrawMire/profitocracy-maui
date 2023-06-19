//
//  SetupView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI

struct SetupView: View {
    @ObservedObject var appSettings: AppSettings
    @Binding var balance: Float
    
    private let balanceFormatter: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        return formatter
    }()
    
    var body: some View {
        NavigationStack {
            Form {
                Section {
                    Picker("Main Currency", selection: $appSettings.mainCurrency) {
                        ForEach(Currency.availableCurrencies) { currency in
                            Text(currency.name).tag(currency)
                        }
                    }
                    .pickerStyle(.navigationLink)
                    TextField("Initial balance...", value: $balance, formatter: balanceFormatter)
                }
            }
            .navigationTitle("Application Setup")
        }
    }
}
