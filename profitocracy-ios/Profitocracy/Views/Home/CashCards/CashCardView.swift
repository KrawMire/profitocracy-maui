//
//  CashCardView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct CashCardView: View {
    let title: String
    let current: Float
    let total: Float
    
    init(title: String, current: Float, total: Float) {
        self.title = title
        self.current = current
        self.total = total
    }
    
    var body: some View {
        VStack {
            Text(title)
                .font(.headline)
                .frame(maxWidth: .infinity, alignment: .leading)
            ProgressView(value: current, total: total)
            
            HStack {
                Text("$\(String(roundNumber(current)))")
                    .font(.caption)
                Spacer()
                Text("$\(String(roundNumber(total)))")
                    .font(.caption)
            }
        }
        .padding()
    }
}

struct SavedAmountCard_Previews: PreviewProvider {
    static var previews: some View {
        CashCardView(
            title: "Saved amount",
            current: 10,
            total: 1500
        )
    }
}
