//
//  TransactionsGroup.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 23.06.23.
//

import Foundation

struct TransactionsGroup: Identifiable {
    var id: UUID
    var title: String
    var transactions: [Transaction]
    
    init(id: UUID = UUID(), title: String, transactions: [Transaction]) {
        self.id = id
        self.title = title
        self.transactions = transactions
    }
}
