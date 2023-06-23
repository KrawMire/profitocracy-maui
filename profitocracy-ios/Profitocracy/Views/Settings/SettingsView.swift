//
//  SettingsView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct SettingsView: View {
    @ObservedObject var viewModel: SettingsViewModel
    
    var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Application settings")) {
                    NavigationLink(
                        destination: SpendCategoriesSettingsView(appSettings: viewModel.appSettings)
                        .navigationTitle("Spend Categories")
                        .navigationBarTitleDisplayMode(.inline)
                    ) {
                        Label("Expense Categories", systemImage: "list.bullet")
                    }
                    NavigationLink(destination: AnchorDatesSettingsView()) {
                        Label("Anchor Dates", systemImage: "calendar")
                    }
                    Picker(selection: $viewModel.appSettings.mainCurrency, label: Label("Currency", systemImage: "banknote")) {
                        ForEach(Currency.availableCurrencies) { currency in
                            Text(currency.name).tag(currency)
                        }
                    }
                    .pickerStyle(.navigationLink)
                }
                Section(header: Text("System settings")) {
                    Picker(selection: $viewModel.appSettings.theme, label: Label("Theme", systemImage: "paintpalette")) {
                        ForEach(Theme.allCases) { theme in
                            Text(theme.rawValue.capitalized).tag(theme)
                        }
                    }
                    .pickerStyle(.navigationLink)
                }
            }
            .navigationTitle("Settings")
        }
    }
}
