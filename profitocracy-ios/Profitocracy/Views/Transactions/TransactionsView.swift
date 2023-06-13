//
//  TransactionsView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct TransactionsView: View {
    let transactions: [Transaction]
    
    var body: some View {
        NavigationStack {
            List(transactions) { transaction in
                TransactionCardView(transaction: transaction)
            }
            .navigationTitle("Transactions")
        }
    }
}

struct TransactionHistoryView_Previews: PreviewProvider {
    static var previews: some View {
        TransactionsView(transactions: Transaction.previewData)
    }
}
