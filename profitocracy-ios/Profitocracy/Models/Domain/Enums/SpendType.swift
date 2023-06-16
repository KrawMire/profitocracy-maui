//
//  SpendType.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

enum SpendType: String, CaseIterable, Identifiable {
    case main
    case secondary
    case saved
    
    var id: Self { self }
}
