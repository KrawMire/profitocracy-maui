//
//  AddTransactionView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct AddTransactionView: View {
    @State private var selectedTransactionType: TransactionType = .expense
    @State private var amount = ""
    @State private var selectedCurrencySymbol = Currency.previewData[0].symbol
    @State private var description = ""
    @State private var selectedCategoryName = SpendCategory.previewData[0].name
    
    var body: some View {
        NavigationStack {
            Form {
                Section {
                    Picker("Transaction Type", selection: $selectedTransactionType) {
                        ForEach(TransactionType.allCases) { transactionType in
                            Text(transactionType.rawValue.capitalized)
                        }
                    }
                    .pickerStyle(.segmented)
                    HStack {
                        Text(selectedTransactionType == .expense ? "-" : "+")
                            .foregroundColor(.gray)
                        TextField("Amount", text: $amount)
                            .keyboardType(.numberPad)
                        Picker("", selection: $selectedCurrencySymbol) {
                            ForEach(Currency.previewData, id: \.symbol) { currency in
                                Text(currency.symbol)
                            }
                        }
                    }
                }
                Section {
                    TextField("Description", text: $description)
                    Picker("Spend Category", selection: $selectedCategoryName) {
                        ForEach(SpendCategory.previewData, id: \.name) { category in
                            Text(category.name)
                        }
                    }
                }
            }
            .navigationTitle("Add transaction")
        }
    }
}

struct AddTransactionView_Previews: PreviewProvider {
    static var previews: some View {
        AddTransactionView()
    }
}

