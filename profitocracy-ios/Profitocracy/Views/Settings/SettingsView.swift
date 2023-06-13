//
//  SettingsView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct SettingsView: View {
    @State var selectedTheme: Theme = .dark
    
    var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Application settings")) {
                    NavigationLink(destination: ExpenseCategoriesSettingsView()) {
                        Label("Expense Categories", systemImage: "list.bullet")
                    }
                    NavigationLink(destination: AnchorDatesSettingsView()) {
                        Label("Anchor Dates", systemImage: "calendar")
                    }
                }
                Section(header: Text("System settings")) {
                    Picker("Theme", selection: $selectedTheme) {
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

struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView()
    }
}
