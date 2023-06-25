//
//  Currency.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

struct Currency: Identifiable, Hashable, Codable {
    var id: UUID
    var name: String
    var code: String
    var symbol: String
    
    init(id: UUID = UUID(), name: String, code: String, symbol: String) {
        self.id = id
        self.name = name
        self.code = code
        self.symbol = symbol
    }
}

extension Currency {
    static let availableCurrencies: [Currency] = [
        Currency(name: "US Dollar", code: "USD", symbol: "$"),
        Currency(name: "Russian Ruble", code: "RUB", symbol: "₽"),
        Currency(name: "European Euro", code: "EUR", symbol: "€"),
        Currency(name: "Armenian Dram", code: "AMD", symbol: "֏"),
        Currency(name: "Georgian Lari", code: "GEL", symbol: "₾")
    ]
}
