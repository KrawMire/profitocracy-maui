//
//  SpendCategorySpending.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import Foundation

struct CategorySpending: Identifiable {
    var id: UUID
    var categoryName: String
    var actualAmount: Float
    var plannedAmount: Float
}
