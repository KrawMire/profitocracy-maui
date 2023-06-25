//
//  TransactionsState.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 20.06.23.
//

import Foundation

class TransactionsState: ObservableObject, Codable {
    @Published var transactions: [Transaction] {
        didSet {
            saveTransactionsState()
        }
    }
    
    enum CodingKeys: String, CodingKey {
        case transactions
    }
    
    private func saveTransactionsState() {
        if let transactionsData = try? JSONEncoder().encode(self) {
            UserDefaults.standard.set(transactionsData, forKey: DefaultKeys.transactions.rawValue)
        }
    }
    
    init(transactions: [Transaction]) {
        self.transactions = transactions
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        transactions = try container.decode([Transaction].self, forKey: .transactions)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(transactions, forKey: .transactions)
    }
}
