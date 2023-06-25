//
//  SpendType.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

enum SpendType: String, CaseIterable, Identifiable, Codable {
    case main
    case secondary
    case saved
    
    var id: Self { self }
}

extension SpendType {
    var stringName: String {
        switch self {
        case .main: return "Main expenses"
        case .secondary: return "Secondary expenses"
        case .saved: return "Saved"
        }
    }
}
