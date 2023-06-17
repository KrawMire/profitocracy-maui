//
//  ProfitocracyApp.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 23.04.23.
//

import SwiftUI

@main
struct ProfitocracyApp: App {
    @State private var transactions = [Transaction]()
    @State private var appSettings = AppSettings(
        categories: [
            SpendCategory(name: "Test category", plannedAmount: 100, isTracking: true)
        ],
        anchorDays: [10, 25],
        theme: .system,
        mainCurrency: Currency(
            name: "US Dollar",
            code: "USD",
            symbol: "$"
        )
    )
    @State private var currentAnchorDate = AnchorDate(
        startDate: Date(),
        balance: 200
    )
    
    var body: some Scene {
        WindowGroup {
            ContentView(
                transactions: $transactions,
                appSettings: $appSettings,
                currentAnchorDate: $currentAnchorDate
            )
        }
    }
}
