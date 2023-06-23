//
//  TransactionsViewModel.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 23.06.23.
//

import Foundation
import SwiftUI

class TransactionsViewModel: ObservableObject {
    @ObservedObject var transactionsState: TransactionsState
    @ObservedObject var appSettings: AppSettings
    @Published var transactionsGroups: [TransactionsGroup]
    
    init(appSettings: AppSettings, transactionsState: TransactionsState) {
        self.appSettings = appSettings
        self.transactionsState = transactionsState
        self.transactionsGroups = []
        
        restructure()
    }
    
    func restructure() -> Void {
        transactionsGroups = [
            TransactionsGroup(
                title: "21.06.2001",
                transactions: transactionsState.transactions
            )
        ]
    }
    
    func addNewTransaction(_ newTransaction: Transaction) -> Void {
        var transactionToAdd = newTransaction
        
        if transactionToAdd.type == .postpone {
            transactionToAdd.spendType = .saved
        }
        
        transactionsState.transactions.insert(transactionToAdd, at: 0)
        restructure()
    }
}
