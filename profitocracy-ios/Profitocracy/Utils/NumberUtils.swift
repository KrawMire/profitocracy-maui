//
//  NumberUtils.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import Foundation

public func roundNumber(_ value: Float) -> Float {
    return round(value * 100) / 100
}

public func roundFloatString(_ value: Float) -> String {
    return String(format: "%.2f", value)
}
