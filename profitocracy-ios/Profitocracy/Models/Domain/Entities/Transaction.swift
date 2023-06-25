//
//  Transaction.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

struct Transaction: Identifiable, Codable {
    let id: UUID
    var type: TransactionType
    var amount: Float
    var spendType: SpendType
    var category: SpendCategory?
    var currency: Currency
    var description: String
    var time: Time
    var date: Date
    
    init(
        id: UUID = UUID(),
        category: SpendCategory? = nil,
        type: TransactionType,
        amount: Float?,
        spendType: SpendType,
        currency: Currency,
        description: String,
        time: Time,
        date: Date
    ) {
        self.id = id
        self.type = type
        self.amount = amount ?? 0
        self.spendType = spendType
        self.currency = currency
        self.category = category
        self.description = description
        self.time = time
        self.date = date
    }
}

extension Transaction {
    static var emptyTransaction: Transaction {
        let date = Date()
        let currentHours = Calendar.current.component(.hour, from: date)
        let currentMinutes = Calendar.current.component(.minute, from: date)
        let currentSeconds = Calendar.current.component(.second, from: date)
        
        return Transaction(
            type: .expense,
            amount: nil,
            spendType: .main,
            currency: Currency.availableCurrencies[0],
            description: "",
            time: Time(hours: currentHours, minutes: currentMinutes, seconds: currentSeconds),
            date: date
        )
    }
}
