//
//  TransactionCardPreview.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI

struct TransactionCardView_Previews: PreviewProvider {
    static var previews: some View {
        TransactionCardView(
            transaction: .constant(Transaction(
                category: SpendCategory(
                    name: "Test Category",
                    plannedAmount: 1000,
                    isTracking: true
                ),
                type: .income,
                amount: 10,
                spendType: .main,
                currency: Currency(
                    name: "US Dollar",
                    code: "USD",
                    symbol: "$"
                ),
                description: "Preview Description",
                time: Time(
                    hours: 10,
                    minutes: 23,
                    seconds: 44),
                date: Date()
            )))
    }
}
