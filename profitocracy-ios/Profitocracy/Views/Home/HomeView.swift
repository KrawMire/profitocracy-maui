//
//  HomeView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct HomeView: View {
    @ObservedObject var appSettings: AppSettings
    
    @Binding var transactions: [Transaction]
    @Binding var currentAnchorDate: AnchorDate
    
    @State private var newTransaction = Transaction.emptyTransaction
    @State private var isPresentingAddTransactionView = false
    
    @State private var totalSpendingsAmount = PlannedBalance(actualAmount: 0, totalAmount: 0)
    @State private var totalSavedAmount: Float = 0
    
    @State private var dailyAmount = PlannedBalance(actualAmount: 0, totalAmount: 0)
    @State private var mainSpendingsAmount = PlannedBalance(actualAmount: 0, totalAmount: 0)
    @State private var secondarySpendingsAmount = PlannedBalance(actualAmount: 0, totalAmount: 0)
    @State private var savedSpendingsAmount = PlannedBalance(actualAmount: 0, totalAmount: 0)
    @State private var categoriesSpendings: [CategorySpending] = []
    
    init(
        appSettings: AppSettings,
        transactions: Binding<[Transaction]>,
        currentAnchorDate: Binding<AnchorDate>
    ) {
        self.appSettings = appSettings
        _transactions = transactions
        _currentAnchorDate = currentAnchorDate
        
        initCategories()
        calculateSpendings()
    }
    
    private func initCategories() -> Void {
        let categoriesSpendings = appSettings.categories.map { category in
            return CategorySpending(
                id: category.id,
                categoryName: category.name,
                actualAmount: 0,
                plannedAmount: category.plannedAmount
            )
        }
        
        self.categoriesSpendings = categoriesSpendings
    }
    
    private func calculateSpendings() -> Void {
        totalSpendingsAmount.actualAmount = 0
        totalSpendingsAmount.totalAmount = currentAnchorDate.balance
        totalSavedAmount = 0
        
        dailyAmount.actualAmount = 0
        mainSpendingsAmount.actualAmount = 0
        secondarySpendingsAmount.actualAmount = 0
        savedSpendingsAmount.actualAmount = 0
        
        for transaction in transactions {
            if transaction.type == .income {
                totalSpendingsAmount.totalAmount += transaction.amount
                continue
            }
            
            if transaction.type == .postpone {
                totalSavedAmount += transaction.amount
            }
            
            if Calendar.current.isDateInToday(transaction.date) && transaction.type != .postpone {
                dailyAmount.actualAmount += transaction.amount
            }
            
            switch transaction.spendType {
            case .main: mainSpendingsAmount.actualAmount += transaction.amount
            case .secondary: secondarySpendingsAmount.actualAmount += transaction.amount
            case .saved: savedSpendingsAmount.actualAmount += transaction.amount
            }
            
            if transaction.category != nil {
                let categorySpendingIndex = categoriesSpendings.firstIndex(where: { $0.id == transaction.category!.id })
                
                if categorySpendingIndex != nil {
                    categoriesSpendings[categorySpendingIndex!].actualAmount += transaction.amount
                }
            }
        }
        
        dailyAmount.totalAmount = totalSpendingsAmount.totalAmount / 15
        mainSpendingsAmount.totalAmount = totalSpendingsAmount.totalAmount * 0.5
        secondarySpendingsAmount.totalAmount = totalSpendingsAmount.totalAmount * 0.3
        savedSpendingsAmount.totalAmount = totalSpendingsAmount.totalAmount * 0.2
    }
    
    var body: some View {   
        NavigationStack {
            Form {
                Section("Total Amounts") {
                    TotalBalanceCardView(
                        anchorDate: $currentAnchorDate,
                        currentValue: $totalSpendingsAmount.actualAmount,
                        currencySymbol: appSettings.mainCurrency.symbol
                    )
                    HStack {
                        Text("Saved Amount")
                            .font(.headline)
                            .frame(maxWidth: .infinity, alignment: .leading)
                        Text("\(appSettings.mainCurrency.symbol)\(roundFloatString(totalSavedAmount))")
                            .font(.subheadline)
                    }
                    .padding()
                }
                Section("Cash for the Day") {
                    HStack {
                        CashCardView(
                            title: "From Actual",
                            current: $dailyAmount.actualAmount,
                            total: $dailyAmount.totalAmount,
                            currencySymbol: appSettings.mainCurrency.symbol
                        )
                        Spacer()
                        CashCardView(
                            title: "From Initial",
                            current: $dailyAmount.actualAmount,
                            total: $dailyAmount.totalAmount,
                            currencySymbol: appSettings.mainCurrency.symbol
                        )
                    }
                }
                Section("Spending Types") {
                    CashCardView(
                        title: "Main Spendings",
                        current: $mainSpendingsAmount.actualAmount,
                        total: $mainSpendingsAmount.totalAmount,
                        currencySymbol: appSettings.mainCurrency.symbol
                    )
                    CashCardView(
                        title: "Secondary Spendings",
                        current: $secondarySpendingsAmount.actualAmount,
                        total: $secondarySpendingsAmount.totalAmount,
                        currencySymbol: appSettings.mainCurrency.symbol
                    )
                    CashCardView(
                        title: "Saved",
                        current: $savedSpendingsAmount.actualAmount,
                        total: $savedSpendingsAmount.totalAmount,
                        currencySymbol: appSettings.mainCurrency.symbol
                    )
                }
                Section("Categories Spendings") {
                    ForEach(categoriesSpendings) { category in
                        CashCardView(
                            title: category.categoryName,
                            current: .constant(120),
                            total: .constant(250),
                            currencySymbol: appSettings.mainCurrency.symbol)
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
            }) {
                NavigationStack {
                    AddTransactionView(
                        transaction: $newTransaction,
                        categories: $appSettings.categories
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
                                    if newTransaction.type == .postpone {
                                        newTransaction.spendType = .saved
                                    }
                                    
                                    transactions.insert(newTransaction, at: 0)
                                    isPresentingAddTransactionView = false
                                    newTransaction = Transaction.emptyTransaction
                                    calculateSpendings()
                                }
                            }
                        }
                }
            }
            .onAppear() {
                initCategories()
                calculateSpendings()
            }
        }
    }
}
