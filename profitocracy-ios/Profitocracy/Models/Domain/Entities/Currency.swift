//
//  Currency.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

struct Currency: Identifiable, Hashable {
    var name: String
    var code: String
    var symbol: String
    var id: UUID
    
    init(id: UUID = UUID(), name: String, code: String, symbol: String) {
        self.id = id
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
