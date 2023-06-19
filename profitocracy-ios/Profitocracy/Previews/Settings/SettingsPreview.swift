//
//  SettingsView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI

struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView(
            appSettings: AppSettings(
                categories: [SpendCategory](),
                anchorDays: [10, 25],
                theme: .system,
                mainCurrency: Currency(name: "US Dollar", code: "USD", symbol: "$"),
                isSetup: true
            )
        )
    }
}
