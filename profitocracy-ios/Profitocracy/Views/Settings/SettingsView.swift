//
//  SettingsView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct SettingsView: View {
    @Binding var appSettings: AppSettings
    
    var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Application settings")) {
                    NavigationLink(destination: ExpenseCategoriesSettingsView(categories: $appSettings.categories)) {
                        Label("Expense Categories", systemImage: "list.bullet")
                    }
                    NavigationLink(destination: AnchorDatesSettingsView()) {
                        Label("Anchor Dates", systemImage: "calendar")
                    }
                }
                Section(header: Text("System settings")) {
                    Picker("Theme", selection: $appSettings.theme) {
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
