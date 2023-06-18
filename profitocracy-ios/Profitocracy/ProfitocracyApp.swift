//
//  ProfitocracyApp.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 23.04.23.
//

import SwiftUI

@main
struct ProfitocracyApp: App {
    @State private var isShowSetupView: Bool
    
    @State private var transactions = [Transaction]()
    @State private var appSettings = AppSettings(
        categories: [],
        anchorDays: [10, 25],
        theme: .system,
        mainCurrency: Currency.availableCurrencies[0]
    )
    @State private var currentAnchorDate = AnchorDate(
        startDate: Date(),
        balance: 200
    )
    
    init() {
        self._isShowSetupView = State(initialValue: true)
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView(
                transactions: $transactions,
                appSettings: $appSettings,
                currentAnchorDate: $currentAnchorDate
            )
            .sheet(isPresented: $isShowSetupView, onDismiss: {
                isShowSetupView = false
            }) {
                SetupView(appSettings: $appSettings)
            }
        }
    }
}
