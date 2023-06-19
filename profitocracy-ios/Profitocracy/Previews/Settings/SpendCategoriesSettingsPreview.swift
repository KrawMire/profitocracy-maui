//
//  ExpenseCategoriesSettingsPreview.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI

struct SpendCategoriesSettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SpendCategoriesSettingsView(
            appSettings: AppSettings(
                categories: [
                    SpendCategory(
                        name: "Transport",
                        plannedAmount: 200,
                        isTracking: true
                    ),
                    SpendCategory(
                        name: "Food",
                        plannedAmount: nil,
                        isTracking: false
                    ),
                    SpendCategory(
                        name: "Rent",
                        plannedAmount: 500,
                        isTracking: true
                    )
                ],
                anchorDays: [10, 25],
                theme: .system,
                mainCurrency: Currency.availableCurrencies[0],
                isSetup: true
            )
        )
    }
}
