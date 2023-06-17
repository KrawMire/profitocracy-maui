//
//  SpendCategory.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

struct SpendCategory: Identifiable, Hashable {
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
