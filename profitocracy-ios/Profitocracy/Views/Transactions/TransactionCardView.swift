//
//  TransactionCardView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 13.06.23.
//

import SwiftUI

struct TransactionCardView: View {
    @Binding var transaction: Transaction
    
    var body: some View {
        VStack {
            HStack() {
                Text("-\(transaction.currency.symbol)\(String(roundNumber(transaction.amount)))")
                    .font(.title3)
                    .fontWeight(.bold)
                Spacer()
                Text("\(transaction.time.hours):\(transaction.time.minutes)")
                    .foregroundColor(.gray)
                
            }
            Text("\(transaction.category != nil ? "\(transaction.category!.name) - " : "")\(transaction.spendType.stringName)")
                .font(.headline)
                .frame(maxWidth: .infinity, alignment: .leading)
            Text(transaction.description)
                .font(.callout)
                .foregroundColor(.gray)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding()
    }
}
