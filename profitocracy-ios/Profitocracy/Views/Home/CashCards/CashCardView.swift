//
//  CashCardView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct CashCardView: View {
    var title: String
    
    var current: Float
    var total: Float?
    var currencySymbol: String
    
    var body: some View {
        if (total != nil) {
            VStack {
                Text(title)
                    .font(.headline)
                    .frame(maxWidth: .infinity, alignment: .leading)
                ProgressView(value: current, total: total!)
                HStack {
                    Text("\(currencySymbol)\(String(roundFloatString(current)))")
                        .font(.caption)
                    Spacer()
                    Text("\(currencySymbol)\(String(roundFloatString(total!)))")
                        .font(.caption)
                }
            }
            .padding()
        } else {
            HStack {
                Text(title)
                    .font(.headline)
                    .frame(maxWidth: .infinity, alignment: .leading)
                Text("\(currencySymbol)\(roundFloatString(current))")
                    .font(.subheadline)
            }
            .padding()
        }
    }
}
