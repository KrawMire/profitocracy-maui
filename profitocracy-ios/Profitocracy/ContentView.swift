//
//  ContentView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 23.04.23.
//

import SwiftUI

struct ContentView: View {
    @ObservedObject var viewModel: AppViewModel
    
    var body: some View {
        TabView {
            HomeView(
                viewModel: HomeViewModel(
                    appSettings: viewModel.appSettings,
                    currentAnchorDate: viewModel.currentAnchorDate,
                    transactionsState: viewModel.transactionsState
                )
            )
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("Home")
                }
            SettingsView(appSettings: viewModel.appSettings)
                .tabItem {
                    Image(systemName: "gear")
                    Text("Settings")
                }
            TransactionsView(
                viewModel: TransactionsViewModel(
                    appSettings: viewModel.appSettings,
                    transactionsState: viewModel.transactionsState
                )
            )
                .tabItem {
                    Image(systemName: "list.dash")
                    Text("Transactions")
                }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static let transactions = [
        Transaction(
            type: .expense,
            amount: 50,
            spendType: .main,
            currency: Currency(name: "US Dollar", code: "USD", symbol: "$"),
            description: "",
            time: Time(hours: 10, minutes: 50, seconds: 11),
            date: Date()
        )
    ]
    
    static let appSettings = AppSettings(
        categories: [
            SpendCategory(name: "Test category", plannedAmount: 100, isTracking: true)
        ],
        anchorDays: [10, 25],
        theme: .system,
        mainCurrency: Currency(
            name: "US Dollar",
            code: "USD",
            symbol: "$"
        ),
        isSetup: true
    )
    
    static let currentAnchorDate = AnchorDate(
        startDate: Date(),
        balance: 200
    )
    
    static var previews: some View {
        ContentView(viewModel: AppViewModel())
    }
}
