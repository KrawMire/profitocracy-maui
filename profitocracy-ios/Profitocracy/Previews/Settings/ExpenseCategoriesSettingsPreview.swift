//
//  ExpenseCategoriesSettingsPreview.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI

struct ExpenseCategoriesSettingsView_Previews: PreviewProvider {
    static var previews: some View {
        ExpenseCategoriesSettingsView(
            categories: .constant([
                SpendCategory(
                    name: "Transport",
                    plannedAmount: 200,
                    isTracking: true
                ),
                SpendCategory(
                    name: "Food",
                    plannedAmount: 150,
                    isTracking: false
                ),
                SpendCategory(
                    name: "Rent",
                    plannedAmount: 500,
                    isTracking: true
                )
            ]))
    }
}
