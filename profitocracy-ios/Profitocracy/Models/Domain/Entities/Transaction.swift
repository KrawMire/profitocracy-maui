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
    
    enum CodingKeys: String, CodingKey {
        case id, type, amount, spendType, category, currency, description, time, date
    }
    
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
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(UUID.self, forKey: .id)
        type = try container.decode(TransactionType.self, forKey: .type)
        amount = try container.decode(Float.self, forKey: .amount)
        spendType = try container.decode(SpendType.self, forKey: .spendType)
        category = try container.decodeIfPresent(SpendCategory.self, forKey: .category)
        currency = try container.decode(Currency.self, forKey: .currency)
        description = try container.decode(String.self, forKey: .description)
        time = try container.decode(Time.self, forKey: .time)
        date = try container.decode(Date.self, forKey: .date)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(type, forKey: .type)
        try container.encode(amount, forKey: .amount)
        try container.encode(spendType, forKey: .spendType)
        try container.encode(category, forKey: .category)
        try container.encode(currency, forKey: .currency)
        try container.encode(description, forKey: .description)
        try container.encode(time, forKey: .time)
        try container.encode(date, forKey: .date)
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
