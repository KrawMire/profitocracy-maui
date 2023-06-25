//
//  AnchorDate.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

class AnchorDate: ObservableObject, Identifiable, Codable {
    @Published var id: UUID
    @Published var startDate: Date
    @Published var balance: Float
    
    enum CodingKeys: String, CodingKey {
        case id
        case startDate
        case balance
    }
    
    init(
        id: UUID = UUID(),
        startDate: Date,
        balance: Float
    ) {
        self.id = id
        self.startDate = startDate
        self.balance = balance
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(UUID.self, forKey: .id)
        startDate = try container.decode(Date.self, forKey: .startDate)
        balance = try container.decode(Float.self, forKey: .balance)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(startDate, forKey: .startDate)
        try container.encode(balance, forKey: .balance)
    }
}
