//
//  Theme.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 13.06.23.
//

import Foundation

enum Theme: String, CaseIterable, Identifiable {
    case system
    case light
    case dark
    
    var id: Self { self }
}
