//
//  ThemeSettingsView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct ThemeSettingsView: View {
    var body: some View {
        Form {
            Section {
                Text("Light")
                Text("Dark")
                Text("System")
            }
        }
        .navigationTitle("Theme Settings")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct ThemeSettingsView_Previews: PreviewProvider {
    static var previews: some View {
        ThemeSettingsView()
    }
}
