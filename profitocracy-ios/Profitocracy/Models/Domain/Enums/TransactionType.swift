//
//  TransactionType.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 13.06.23.
//

import Foundation

enum TransactionType: String, CaseIterable, Identifiable, Codable {
    case expense
    case income
    case postpone
    
    var id: Self { self }
}
