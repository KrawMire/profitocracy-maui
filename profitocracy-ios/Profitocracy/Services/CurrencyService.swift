//
//  CurrencyService.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 25.06.23.
//

import Foundation

struct RatesResponse: Codable {
    let rates: [String: Double]
}

class CurrencyService {
    static func getCurrencyRate(baseCurrency: Currency, completion: @escaping (Result<RatesResponse, Error>) -> Void) {
        let url = URL(string: "https://api.exchangerate.host/latest?base=\(baseCurrency.code)")!

        let task = URLSession.shared.dataTask(with: url) { data, response, error in
            if data != nil {
                do {
                    let decoder = JSONDecoder()
                    let response = try decoder.decode(RatesResponse.self, from: data!)
                    completion(.success(response))
                    
                } catch {
                    print("Error decoding JSON: \(error.localizedDescription)")
                }
            } else {
                print("Invalid data")
            }
        }

        task.resume()
    }
}
