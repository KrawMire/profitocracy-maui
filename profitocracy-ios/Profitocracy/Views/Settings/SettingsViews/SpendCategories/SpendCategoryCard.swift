//
//  SpendCategoryCard.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI

struct SpendCategoryCard: View {
    @Binding var category: SpendCategory
    @Binding var currencySymbol: String
    
    var body: some View {
        Text("\(category.name) - \(category.plannedAmount != nil ? "\(currencySymbol)\(roundFloatString(category.plannedAmount!))" : "Unlimited")")
            .frame(maxWidth: .infinity, alignment: .leading)
    }
}

struct SpendCategoryCard_Previews: PreviewProvider {
    static var previews: some View {
        SpendCategoryCard(
            category: .constant(SpendCategory(
                name: "Transport",
                plannedAmount: 200,
                isTracking: true
            )),
            currencySymbol: .constant("$")
        )
    }
}
