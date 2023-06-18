//
//  SetupPreview.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI

struct SetupView_Previews: PreviewProvider {
    private static var appSettings = AppSettings(
        categories: [],
        anchorDays: [10, 25],
        theme: .system,
        mainCurrency: Currency.availableCurrencies[0]
    )
    
    static var previews: some View {
        SetupView(appSettings: .constant(appSettings))
    }
}
