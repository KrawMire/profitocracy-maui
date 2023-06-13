//
//  Theme.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 13.06.23.
//

import Foundation

enum Theme: String, CaseIterable, Identifiable {
    case dark
    case light
    case system
    
    var id: Self { self }
}
