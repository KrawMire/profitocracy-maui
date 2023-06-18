//
//  TransactionsPreview.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI

struct TransactionHistoryView_Previews: PreviewProvider {
    static var previews: some View {
        TransactionsView(transactions: .constant([Transaction.emptyTransaction]))
    }
}
