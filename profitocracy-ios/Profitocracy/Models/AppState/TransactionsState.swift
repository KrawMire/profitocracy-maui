//
//  TransactionsState.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 20.06.23.
//

import Foundation

class TransactionsState: ObservableObject {
    @Published var transactions: [Transaction]
    
    init(transactions: [Transaction]) {
        self.transactions = transactions
    }
}
