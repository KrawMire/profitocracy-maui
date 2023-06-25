//
//  CurrencyRatesState.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 25.06.23.
//

import Foundation

class CurrencyRatesState: ObservableObject, Codable {
    @Published var currencyRates: [CurrencyRate] {
        didSet {
            saveCurrencyRatesState()
        }
    }
    
    private func saveCurrencyRatesState() {
        if let currencyRates = try? JSONEncoder().encode(self) {
            UserDefaults.standard.set(currencyRates, forKey: DefaultKeys.currencyRates.rawValue)
        }
    }

    enum CodingKeys: String, CodingKey {
        case currencyRates
    }
    
    init(currencyRates: [CurrencyRate]) {
        self.currencyRates = currencyRates
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        currencyRates = try container.decode([CurrencyRate].self, forKey: .currencyRates)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(currencyRates, forKey: .currencyRates)
    }
}
