//
//  CashCardView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct CashCardView: View {
    var title: String
    
    @Binding var current: Float
    @Binding var total: Float
    @Binding var currencySymbol: String
    
    var body: some View {
        VStack {
            Text(title)
                .font(.headline)
                .frame(maxWidth: .infinity, alignment: .leading)
            ProgressView(value: current, total: total)
            HStack {
                Text("\(currencySymbol)\(String(roundFloatString(current)))")
                    .font(.caption)
                Spacer()
                Text("\(currencySymbol)\(String(roundFloatString(total)))")
                    .font(.caption)
            }
        }
        .padding()
    }
}
