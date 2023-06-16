//
//  Currency.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

struct Currency: Identifiable {
    let name: String
    let code: String
    let symbol: String
    let id: UUID
    
    init(id: UUID = UUID(), name: String, code: String, symbol: String) {
        self.name = name
        self.code = code
        self.symbol = symbol
    }
}

extension Currency {
    static let availableCurrencies: [Currency] = [
        Currency(name: "Dollar", code: "USD", symbol: "$"),
        Currency(name: "Ruble", code: "RUB", symbol: "₽"),
        Currency(name: "Euro", code: "EUR", symbol: "€")
    ]
}
