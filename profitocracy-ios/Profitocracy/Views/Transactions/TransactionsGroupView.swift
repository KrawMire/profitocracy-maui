//
//  TransactionsGroupView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 23.06.23.
//

import SwiftUI

struct TransactionsGroupView: View {
    var transactionsGroup: TransactionsGroup
    
    var body: some View {
        ForEach(transactionsGroup.transactions) { transaction in
            TransactionCardView(transaction: transaction)
        }
    }
}

struct TransactionsGroupView_Previews: PreviewProvider {
    static var previews: some View {
        TransactionsGroupView(transactionsGroup: TransactionsGroup(
            title: "21.06.2001",
            transactions: [
                Transaction.emptyTransaction
            ]
        ))
    }
}
