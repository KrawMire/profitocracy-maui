//
//  AnchorDate.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

class AnchorDate: ObservableObject, Identifiable {
    @Published var id: UUID
    @Published var startDate: Date
    @Published var balance: Float
    
    init(id: UUID = UUID(), startDate: Date, balance: Float) {
        self.id = id
        self.startDate = startDate
        self.balance = balance
    }
}
