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

struct TransactionCardView_Previews: PreviewProvider {
    static var previews: some View {
        TransactionCardView(
            transaction: .constant(Transaction(
                category: SpendCategory(
                    name: "Test Category",
                    plannedAmount: 1000,
                    isTracking: true
                ),
                type: .expense,
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
