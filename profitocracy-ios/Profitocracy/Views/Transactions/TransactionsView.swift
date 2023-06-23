//
//  TransactionsView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct TransactionsView: View {
    @ObservedObject var viewModel: TransactionsViewModel
    
    @State private var newTransaction = Transaction.emptyTransaction
    @State private var isPresentingAddTransactionView = false
    
    init(viewModel: TransactionsViewModel) {
        self.viewModel = viewModel
    }
    
    var body: some View {
        NavigationStack {
            List($viewModel.transactionsGroups) { transactionGroup in
                Section(transactionGroup.title.wrappedValue) {
                    TransactionsGroupView(transactionsGroup: transactionGroup.wrappedValue)
                }
            }
            .navigationTitle("Transactions")
            .toolbar() {
                Button(action: {
                    isPresentingAddTransactionView = true
                }) {
                    Image(systemName: "plus.circle.fill")
                }
            }
            .sheet(isPresented: $isPresentingAddTransactionView, onDismiss: {
                isPresentingAddTransactionView = false
                newTransaction = Transaction.emptyTransaction
            }) {
                NavigationStack {
                    AddTransactionView(
                        transaction: $newTransaction,
                        categories: $viewModel.appSettings.categories
                    )
                        .navigationTitle("Add transaction")
                        .toolbar {
                            ToolbarItem(placement: .cancellationAction) {
                                Button("Cancel") {
                                    isPresentingAddTransactionView = false
                                    newTransaction = Transaction.emptyTransaction
                                }
                            }
                            ToolbarItem(placement: .confirmationAction) {
                                Button("Add") {
                                    viewModel.addNewTransaction(newTransaction)
                                    
                                    isPresentingAddTransactionView = false
                                    newTransaction = Transaction.emptyTransaction
                                }
                            }
                        }
                }
            }
        }
        .onAppear() {
            viewModel.restructure()
        }
    }
}
