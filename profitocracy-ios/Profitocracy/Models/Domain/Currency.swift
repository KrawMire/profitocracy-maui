//
//  Currency.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

struct Currency {
    let name: String
    let code: String
    let symbol: String
}

extension Currency {
    static let previewData: [Currency] = [
        Currency(name: "Ruble", code: "RUB", symbol: "₽"),
        Currency(name: "Dollar", code: "USD", symbol: "$"),
        Currency(name: "Euro", code: "EUR", symbol: "€")
    ]
}
