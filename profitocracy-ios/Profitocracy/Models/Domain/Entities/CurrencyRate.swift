//
//  CurrencyRate.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

struct CurrencyRate: Identifiable, Codable {
    var id: UUID
    var currency: Currency
    var rate: Float
    
    init(
        id: UUID = UUID(),
        currency: Currency,
        rate: Float
    ) {
        self.id = id
        self.currency = currency
        self.rate = rate
    }
}
