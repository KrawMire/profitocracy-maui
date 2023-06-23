//
//  HomeView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct HomeView: View {
    @ObservedObject var viewModel: HomeViewModel
    
    @State private var newTransaction = Transaction.emptyTransaction
    @State private var isPresentingAddTransactionView = false
    
    init(viewModel: HomeViewModel) {
        self.viewModel = viewModel
    }
    
    var body: some View {   
        NavigationStack {
            Form {
                Section("Total Amounts") {
                    TotalBalanceCardView(
                        anchorDate: viewModel.currentAnchorDate,
                        nextDate: viewModel.nextAnchorDate,
                        currentValue: viewModel.totalSpendingsAmount.actualAmount,
                        currencySymbol: viewModel.appSettings.mainCurrency.symbol
                    )
                    HStack {
                        Text("Saved Amount")
                            .font(.headline)
                            .frame(maxWidth: .infinity, alignment: .leading)
                        Text("\(viewModel.appSettings.mainCurrency.symbol)\(roundFloatString(viewModel.totalSavedAmount))")
                            .font(.subheadline)
                    }
                    .padding()
                }
                Section("Cash for the Day") {
                    HStack {
                        CashCardView(
                            title: "From Actual",
                            current: viewModel.dailyAmount.actualAmount,
                            total: viewModel.dailyAmount.totalAmount,
                            currencySymbol: viewModel.appSettings.mainCurrency.symbol
                        )
                        Spacer()
                        CashCardView(
                            title: "From Initial",
                            current: viewModel.dailyAmount.actualAmount,
                            total: viewModel.dailyAmount.totalAmount,
                            currencySymbol: viewModel.appSettings.mainCurrency.symbol
                        )
                    }
                }
                Section("Spending Types") {
                    CashCardView(
                        title: "Main Spendings",
                        current: viewModel.mainSpendingsAmount.actualAmount,
                        total: viewModel.mainSpendingsAmount.totalAmount,
                        currencySymbol: viewModel.appSettings.mainCurrency.symbol
                    )
                    CashCardView(
                        title: "Secondary Spendings",
                        current: viewModel.secondarySpendingsAmount.actualAmount,
                        total: viewModel.secondarySpendingsAmount.totalAmount,
                        currencySymbol: viewModel.appSettings.mainCurrency.symbol
                    )
                    CashCardView(
                        title: "Saved",
                        current: viewModel.savedSpendingsAmount.actualAmount,
                        total: viewModel.savedSpendingsAmount.totalAmount,
                        currencySymbol: viewModel.appSettings.mainCurrency.symbol
                    )
                }
                Section("Categories Spendings") {
                    ForEach(viewModel.categoriesSpendings) { category in
                        CashCardView(
                            title: category.categoryName,
                            current: category.actualAmount,
                            total: category.plannedAmount,
                            currencySymbol: viewModel.appSettings.mainCurrency.symbol)
                    }
                }
            }
            .navigationTitle("Home")
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
            .onAppear() {
                viewModel.recalculateTransactions()
            }
        }
    }
}
