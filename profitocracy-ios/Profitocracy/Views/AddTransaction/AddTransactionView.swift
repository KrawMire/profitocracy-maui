//
//  AddTransactionView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct AddTransactionView: View {
    @Binding var transaction: Transaction
    @Binding var categories: [SpendCategory]
    
    private let amountFormatter: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        return formatter
    }()
    
    var body: some View {
        NavigationStack {
            Form {
                Section {
                    Picker("Transaction Type", selection: $transaction.type) {
                        ForEach(TransactionType.allCases) { transactionType in
                            Text(transactionType.rawValue.capitalized)
                        }
                    }
                    .pickerStyle(.segmented)
                    if transaction.type == .expense {
                        Picker("Spend Type", selection: $transaction.spendType) {
                            ForEach([SpendType.main, SpendType.secondary]) { spendType in
                                Text(spendType.rawValue.capitalized).tag(spendType)
                            }
                        }
                        .pickerStyle(.segmented)
                    }
                    HStack {
                        Text(
                            transaction.type == .expense
                            ? "-"
                            : transaction.type == .income
                            ? "+"
                            : ""
                        )
                            .foregroundColor(.gray)
                        TextField("Amount", value: $transaction.amount, formatter: amountFormatter)
                            .keyboardType(.decimalPad)
                        Picker("", selection: $transaction.currency) {
                            ForEach(Currency.availableCurrencies, id: \.symbol) { currency in
                                Text(currency.symbol).tag(currency)
                            }
                        }
                        .pickerStyle(.menu)
                    }
                }
                Section {
                    TextField("Description", text: $transaction.description)
                    Picker("Category", selection: $transaction.category) {
                        Text("None").tag(nil as SpendCategory?)
                            .foregroundColor(.red)
                        ForEach(categories) { category in
                            Text(category.name).tag(category as SpendCategory?)
                        }
                    }
                }
            }
            .navigationTitle("Add transaction")
        }
    }
}
