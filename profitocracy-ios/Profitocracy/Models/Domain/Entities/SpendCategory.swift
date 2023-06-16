//
//  SpendCategory.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

struct SpendCategory: Identifiable {
    let id: UUID
    var name: String
    var plannedAmount: Float
    var isTracking: Bool
    
    init(id: UUID = UUID(), name: String, plannedAmount: Float, isTracking: Bool) {
        self.id = id
        self.name = name
        self.plannedAmount = plannedAmount
        self.isTracking = isTracking
    }
}

extension SpendCategory {
    static let previewData: [SpendCategory] = [
        SpendCategory(name: "Transport", plannedAmount: 120, isTracking: false),
        SpendCategory(name: "Food", plannedAmount: 250, isTracking: true),
        SpendCategory(name: "Health", plannedAmount: 200, isTracking: false)
    ]
}
