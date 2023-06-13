//
//  SettingsView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct SettingsView: View {
    var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Application settings")) {
                    NavigationLink(destination: ExpenseCategoriesSettingsView()) {
                        Label("Expense categories", systemImage: "list.bullet")
                    }
                }
                Section(header: Text("System settings")) {
                    NavigationLink(destination: ThemeSettingsView()) {
                        Label("Theme", systemImage: "paintpalette")
                    }
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
