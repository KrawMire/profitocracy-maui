//
//  SetupView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI

struct SetupView: View {
    @Binding var appSettings: AppSettings
    
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
                    //TextField("Initial balance...")
                }
            }
            .navigationTitle("Application Setup")
        }
    }
}
