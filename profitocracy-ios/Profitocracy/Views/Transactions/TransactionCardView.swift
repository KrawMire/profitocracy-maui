//
//  TransactionCardView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 13.06.23.
//

import SwiftUI

struct TransactionCardView: View {
    let transaction: Transaction
    
    var body: some View {
        VStack {
            HStack() {
                Text("-$\(String(roundNumber(transaction.amount)))")
                    .font(.title3)
                    .fontWeight(.bold)
                Spacer()
                Text(transaction.time)
                    .foregroundColor(.gray)
                
            }
            Text("\(transaction.expenseType) - \(transaction.expenseCategory)")
                .font(.headline)
                .frame(maxWidth: .infinity, alignment: .leading)
            Text(transaction.description)
                .font(.callout)
                .foregroundColor(.gray)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding()
    }
    
    init(transaction: Transaction) {
        self.transaction = transaction
    }
}

struct TransactionCardView_Previews: PreviewProvider {
    static var previews: some View {
        TransactionCardView(transaction: Transaction.previewData[0])
    }
}
