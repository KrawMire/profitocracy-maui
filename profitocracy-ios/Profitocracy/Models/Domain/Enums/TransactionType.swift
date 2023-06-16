//
//  TransactionType.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 13.06.23.
//

import Foundation

enum TransactionType: String, CaseIterable, Identifiable {
    case expense
    case income
    
    var id: Self { self }
}
