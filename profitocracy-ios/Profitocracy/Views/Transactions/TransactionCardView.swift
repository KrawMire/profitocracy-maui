//
//  TransactionCardView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 13.06.23.
//

import SwiftUI

struct TransactionCardView: View {
    @Binding var transaction: Transaction
    
    private var transactionSign: String {
        switch transaction.type {
        case .expense: return "-"
        case .income: return "+"
        case .postpone: return ""
        }
    }
    
    private var transactionHeader: String {
        if transaction.type == .postpone {
            return "Saved"
        }
        
        let category = transaction.category != nil ? "\(transaction.category!.name) - " : ""
        
        return transaction.type == .income ? "\(category)Income" : "\(category)\(transaction.spendType.stringName)"
    }
    
    var body: some View {
        VStack {
            HStack() {
                Text("\(transactionSign)\(transaction.currency.symbol)\(String(roundNumber(transaction.amount)))")
                    .font(.title3)
                    .fontWeight(.bold)
                Spacer()
                Text("\(transaction.time.hours):\(transaction.time.minutes)")
                    .foregroundColor(.gray)
                
            }
            Text(transactionHeader)
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
