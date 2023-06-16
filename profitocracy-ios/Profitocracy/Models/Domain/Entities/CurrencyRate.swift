//
//  CurrencyRate.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

struct CurrencyRate: Identifiable {
    let id: UUID
    let currency: Currency
    
    init(id: UUID = UUID(), currency: Currency) {
        self.id = id
        self.currency = currency
    }
}
