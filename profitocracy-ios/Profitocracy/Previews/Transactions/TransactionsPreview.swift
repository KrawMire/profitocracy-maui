//
//  TransactionsPreview.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI

struct TransactionHistoryView_Previews: PreviewProvider {
    static var previews: some View {
        TransactionsView(
            viewModel: TransactionsViewModel(
                appSettings: AppSettings(
                    categories: [],
                    anchorDays: [],
                    theme: .system,
                    mainCurrency: Currency(
                        name: "dsadsa",
                        code: "dsadsa",
                        symbol: "$"
                    ),
                    isSetup: true
                ),
                transactionsState: TransactionsState(
                    transactions: [Transaction.emptyTransaction]
                )
            )
        )
    }
}
