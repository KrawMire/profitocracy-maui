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
    
    @State private var isPresentingAddTransactionView: Bool
    @State private var newTransaction: Transaction
    
    @State private var totalSpendingsAmount: PlannedBalance
    @State private var totalSavedAmount: Float
    
    @State private var dailyAmount: PlannedBalance
    @State private var mainSpendingsAmount: PlannedBalance
    @State private var secondarySpendingsAmount: PlannedBalance
    @State private var savedSpendingsAmount: PlannedBalance
    @State private var categoriesSpendings: [CategorySpending]
    
    init(
        appSettings: AppSettings,
        transactions: Binding<[Transaction]>,
        currentAnchorDate: Binding<AnchorDate>
    ) {
        self.appSettings = appSettings
        _transactions = transactions
        _currentAnchorDate = currentAnchorDate
        
        _isPresentingAddTransactionView = State(initialValue: false)
        _newTransaction = State(initialValue: Transaction.emptyTransaction)
        
        _totalSpendingsAmount = State(initialValue: PlannedBalance(actualAmount: 0, totalAmount: 0))
        _totalSavedAmount = State(initialValue: 0)
        
        _dailyAmount = State(initialValue: PlannedBalance(actualAmount: 0, totalAmount: 0))
        _mainSpendingsAmount = State(initialValue: PlannedBalance(actualAmount: 0, totalAmount: 0))
        _secondarySpendingsAmount = State(initialValue: PlannedBalance(actualAmount: 0, totalAmount: 0))
        _savedSpendingsAmount = State(initialValue: PlannedBalance(actualAmount: 0, totalAmount: 0))
        
        let categoriesSpendings = appSettings.categories.map { category in
            return CategorySpending(
                id: category.id,
                categoryName: category.name,
                actualAmount: 0,
                plannedAmount: category.plannedAmount
            )
        }
        
        _categoriesSpendings = State(initialValue: categoriesSpendings)
        
        _calculateSpendings()
    }
    
    private func _calculateSpendings() -> Void {
        totalSpendingsAmount.actualAmount = 0
        totalSpendingsAmount.totalAmount = currentAnchorDate.balance
        totalSavedAmount = 0
        
        dailyAmount.actualAmount = 0
        dailyAmount.totalAmount = 200
        
        mainSpendingsAmount.actualAmount = 0
        mainSpendingsAmount.totalAmount = currentAnchorDate.balance * 0.5
        secondarySpendingsAmount.actualAmount = 0
        secondarySpendingsAmount.totalAmount = currentAnchorDate.balance * 0.3
        savedSpendingsAmount.actualAmount = 0
        savedSpendingsAmount.totalAmount = currentAnchorDate.balance * 0.2
        
        for transaction in transactions {
            if Calendar.current.isDateInToday(transaction.date)
                && transaction.type == .expense {
                dailyAmount.actualAmount += transaction.amount
            }
            
            if transaction.type == .income || transaction.type == .postpone {
                totalSpendingsAmount.actualAmount += transaction.amount
                
                if transaction.type == .postpone {
                    totalSavedAmount += transaction.amount
                }
                
                continue
            }
            
            switch transaction.spendType {
            case .main:
                mainSpendingsAmount.actualAmount += transaction.amount
            case .secondary:
                secondarySpendingsAmount.actualAmount += transaction.amount
            case .saved:
                savedSpendingsAmount.actualAmount += transaction.amount
            }
            
            if transaction.category != nil {
                let categorySpendingIndex = categoriesSpendings.firstIndex(where: { $0.id == transaction.category!.id })
                
                if categorySpendingIndex != nil {
                    categoriesSpendings[categorySpendingIndex!].actualAmount += transaction.amount
                }
            }
        }
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
                                    _calculateSpendings()
                                }
                            }
                        }
                }
            }
            .onChange(of: appSettings.categories) { _ in
                _calculateSpendings()
            }
            .onAppear() {
                _calculateSpendings()
            }
        }
    }
}
