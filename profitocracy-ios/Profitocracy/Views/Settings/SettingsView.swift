//
//  SettingsView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct SettingsView: View {
    @ObservedObject var appSettings: AppSettings
    
    var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Application settings")) {
                    NavigationLink(
                        destination: SpendCategoriesSettingsView(appSettings: appSettings)
                        .navigationTitle("Spend Categories")
                        .navigationBarTitleDisplayMode(.inline)
                    ) {
                        Label("Expense Categories", systemImage: "list.bullet")
                    }
                    NavigationLink(destination: AnchorDatesSettingsView()) {
                        Label("Anchor Dates", systemImage: "calendar")
                    }
                    Picker(selection: $appSettings.mainCurrency.name, label: Label("Currency", systemImage: "banknote")) {
                        ForEach(Currency.availableCurrencies, id: \.name) { currency in
                            Text(currency.name).tag(currency)
                        }
                    }
                    .pickerStyle(.navigationLink)
                }
                Section(header: Text("System settings")) {
                    Picker(selection: $appSettings.theme, label: Label("Theme", systemImage: "paintpalette")) {
                        ForEach(Theme.allCases) { theme in
                            Text(theme.rawValue.capitalized)
                        }
                    }
                    .pickerStyle(.navigationLink)
                }
            }
            .navigationTitle("Settings")
        }
    }
}
