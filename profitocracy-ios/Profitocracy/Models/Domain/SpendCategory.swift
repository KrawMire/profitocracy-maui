//
//  SpendCategory.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

struct SpendCategory {
    var name: String
    var plannedAmount: Float
    var isTracking: Bool
}

extension SpendCategory {
    static let previewData: [SpendCategory] = [
        SpendCategory(name: "Transport", plannedAmount: 120, isTracking: false),
        SpendCategory(name: "Food", plannedAmount: 250, isTracking: true),
        SpendCategory(name: "Health", plannedAmount: 200, isTracking: false)
    ]
}
