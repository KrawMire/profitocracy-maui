//
//  Transaction.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

struct Transaction: Identifiable {
    let id: UUID
    var amount: Float
    var expenseType: String
    var expenseCategory: String
    var description: String
    var time: String
    var date: String
    
    init(
        id: UUID = UUID(),
        amount: Float,
        expenseType: String,
        expenseCategory: String,
        description: String,
        time: String,
        date: String
    ) {
        self.id = id
        self.amount = amount
        self.expenseType = expenseType
        self.expenseCategory = expenseCategory
        self.description = description
        self.time = time
        self.date = date
    }
}

extension Transaction {
    static let previewData = [
        Transaction(amount: 24, expenseType: "Main expenses", expenseCategory: "Products", description: "Apples and meat", time: "00:32", date: "13.06.2023"),
        Transaction(amount: 120, expenseType: "Secondary expenses", expenseCategory: "Car", description: "Oil", time: "18:48", date: "12.06.2023"),
        Transaction(amount: 39, expenseType: "Saved", expenseCategory: "Health", description: "Pants and T-Shirt", time: "11:00", date: "11.06.2023"),
    ]
}
