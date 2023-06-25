//
//  HomeViewModel.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 22.06.23.
//

import Foundation
import SwiftUI

class HomeViewModel: ObservableObject {
    @ObservedObject var appSettings: AppSettings
    @ObservedObject var currentAnchorDate: AnchorDate
    @ObservedObject var transactionsState: TransactionsState
    
    @Published var totalSpendingsAmount = PlannedBalance(actualAmount: 0, totalAmount: 0)
    @Published var totalSavedAmount: Float = 0
    
    @Published var dailyAmountInitial = PlannedBalance(actualAmount: 0, totalAmount: 0)
    @Published var dailyAmountActual = PlannedBalance(actualAmount: 0, totalAmount: 0)
    
    @Published var mainSpendingsAmount = PlannedBalance(actualAmount: 0, totalAmount: 0)
    @Published var secondarySpendingsAmount = PlannedBalance(actualAmount: 0, totalAmount: 0)
    @Published var savedSpendingsAmount = PlannedBalance(actualAmount: 0, totalAmount: 0)
    @Published var categoriesSpendings: [CategorySpending] = []
    
    var nextAnchorDate: Date {
        return getNextAnchorDate(currentAnchorDate: currentAnchorDate, anchorDays: appSettings.anchorDays)
    }
    
    init(
        appSettings: AppSettings,
        currentAnchorDate: AnchorDate,
        transactionsState: TransactionsState
    ) {
        self.appSettings = appSettings
        self.currentAnchorDate = currentAnchorDate
        self.transactionsState = transactionsState
        
        initCategories()
        calculateSpendings()
    }
    
    func addNewTransaction(_ newTransaction: Transaction) -> Void {
        var transactionToAdd = newTransaction
        
        if transactionToAdd.type == .postpone {
            transactionToAdd.spendType = .saved
        }
        
        transactionsState.transactions.insert(transactionToAdd, at: 0)
        calculateSpendings()
    }
    
    func recalculateTransactions() -> Void {
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
        var spendToday: Float = 0
        
        totalSpendingsAmount.actualAmount = 0
        totalSpendingsAmount.totalAmount = currentAnchorDate.balance
        totalSavedAmount = 0
        
        dailyAmountInitial.actualAmount = 0
        dailyAmountActual.actualAmount = 0
        
        mainSpendingsAmount.actualAmount = 0
        secondarySpendingsAmount.actualAmount = 0
        savedSpendingsAmount.actualAmount = 0
        
        for transaction in transactionsState.transactions {
            if transaction.type == .income {
                totalSpendingsAmount.totalAmount += transaction.amount
                continue
            }
            
            if transaction.type == .postpone {
                totalSavedAmount += transaction.amount
            }
            
            if Calendar.current.isDateInToday(transaction.date) && transaction.type != .postpone {
                spendToday += transaction.amount
            }
            
            if (currentAnchorDate.startDate >= transaction.date || transaction.date >= nextAnchorDate) {
                continue
            }
            
            totalSpendingsAmount.actualAmount += transaction.amount
            
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
        
        let initialDatesDiff = getDateDiffInDays(dateFrom: currentAnchorDate.startDate, dateTo: nextAnchorDate)
        let actualDatesDiff = getDateDiffInDays(dateFrom: getCurrentLocalDate(), dateTo: nextAnchorDate)
        
        dailyAmountInitial.totalAmount = totalSpendingsAmount.totalAmount / Float(initialDatesDiff)
        dailyAmountActual.totalAmount = totalSpendingsAmount.totalAmount / Float(actualDatesDiff)
        
        dailyAmountInitial.actualAmount = spendToday
        dailyAmountActual.actualAmount = spendToday
        
        mainSpendingsAmount.totalAmount = totalSpendingsAmount.totalAmount * 0.5
        secondarySpendingsAmount.totalAmount = totalSpendingsAmount.totalAmount * 0.3
        savedSpendingsAmount.totalAmount = totalSpendingsAmount.totalAmount * 0.2
    }
    
    private func getDateDiffInDays(dateFrom: Date, dateTo: Date) -> Int {
        let components = Calendar.current.dateComponents([.day], from: dateFrom, to: dateTo)
        return components.day!
    }
    
    private func getCurrentLocalDate() -> Date {
        let currentDate = Date()
        let calendar = Calendar.current

        let components = calendar.dateComponents([.year, .month, .day], from: currentDate)
        return calendar.date(from: components)!
    }
}
