//
//  HomeView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct HomeView: View {
    @Binding var transactions: [Transaction]
    @Binding var appSettings: AppSettings
    @Binding var currentAnchorDate: AnchorDate
    
    @State private var isPresentingAddTransactionView: Bool
    @State private var newTransaction: Transaction
    
    @State private var totalSpendingsAmount: Float
    @State private var totalSavedAmount: Float
    
    @State private var dailyAmount: Float
    @State private var mainSpendingsAmount: Float
    @State private var secondarySpendingsAmount: Float
    @State private var savedSpendingsAmount: Float
    
    init(
        transactions: Binding<[Transaction]>,
        appSettings: Binding<AppSettings>,
        currentAnchorDate: Binding<AnchorDate>
    ) {
        _transactions = transactions
        _appSettings = appSettings
        _currentAnchorDate = currentAnchorDate
        
        _isPresentingAddTransactionView = State(initialValue: false)
        _newTransaction = State(initialValue: Transaction.emptyTransaction)
        
        _totalSpendingsAmount = State(initialValue: 0)
        _totalSavedAmount = State(initialValue: 0)
        
        _dailyAmount = State(initialValue: 0)
        _mainSpendingsAmount = State(initialValue: 0)
        _secondarySpendingsAmount = State(initialValue: 0)
        _savedSpendingsAmount = State(initialValue: 0)
        
        _calculateSpendings()
    }
    
    private func _calculateSpendings() -> Void {
        totalSpendingsAmount = 0
        totalSavedAmount = 0
        
        dailyAmount = 0
        mainSpendingsAmount = 0
        secondarySpendingsAmount = 0
        savedSpendingsAmount = 0
        
        for transaction in transactions {
            if Calendar.current.isDateInToday(transaction.date)
                && transaction.type == .expense {
                dailyAmount += transaction.amount
            }
            
            if transaction.type == .income || transaction.type == .postpone {
                totalSpendingsAmount += transaction.amount
                
                if transaction.type == .postpone {
                    totalSavedAmount += transaction.amount
                }
                
                continue
            }
            
            switch transaction.spendType {
            case .main:
                mainSpendingsAmount += transaction.amount
            case .secondary:
                secondarySpendingsAmount += transaction.amount
            case .saved:
                savedSpendingsAmount += transaction.amount
            }
        }
    }
    
    var body: some View {   
        NavigationStack {
            Form {
                Section("Total Amounts") {
                    TotalBalanceCardView(
                        anchorDate: $currentAnchorDate,
                        currentValue: $totalSpendingsAmount,
                        currencySymbol: $appSettings.mainCurrency.symbol
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
                            current: $dailyAmount,
                            total: .constant(120),
                            currencySymbol: $appSettings.mainCurrency.symbol
                        )
                        Spacer()
                        CashCardView(
                            title: "From Initial",
                            current: $dailyAmount,
                            total: .constant(150),
                            currencySymbol: $appSettings.mainCurrency.symbol
                        )
                    }
                }
                Section("Spending Types") {
                    CashCardView(
                        title: "Main Spendings",
                        current: $mainSpendingsAmount,
                        total: .constant(7500),
                        currencySymbol: $appSettings.mainCurrency.symbol
                    )
                    CashCardView(
                        title: "Secondary Spendings",
                        current: $secondarySpendingsAmount,
                        total: .constant(5000),
                        currencySymbol: $appSettings.mainCurrency.symbol
                    )
                    CashCardView(
                        title: "Saved",
                        current: $savedSpendingsAmount,
                        total: .constant(1500),
                        currencySymbol: $appSettings.mainCurrency.symbol
                    )
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
            .sheet(isPresented: $isPresentingAddTransactionView) {
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
        }
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView(
            transactions: .constant([
                Transaction(
                    type: .expense,
                    amount: 10,
                    spendType: .main,
                    currency: Currency(name: "US Dollar", code: "USD", symbol: "$"),
                    description: "",
                    time: Time(hours: 10, minutes: 50, seconds: 11),
                    date: Date()
                )
            ]),
            appSettings: .constant(AppSettings(
                categories: [SpendCategory](),
                anchorDays: [10, 25],
                theme: .system,
                mainCurrency: Currency(name: "US Dollar", code: "USD", symbol: "$"))
            ),
            currentAnchorDate: .constant(AnchorDate(startDate: Date(), balance: 1000))
        )
        .environmentObject(
        AppSettings(
            categories: [SpendCategory](),
            anchorDays: [10, 25],
            theme: .system,
            mainCurrency: Currency(
                name: "US Dollar", code: "USD", symbol: "$"
            )
        ))
    }
}
