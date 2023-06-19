//
//  ProfitocracyApp.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 23.04.23.
//

import SwiftUI

@main
struct ProfitocracyApp: App {
    @ObservedObject var viewModel = AppViewModel()
    
    var body: some Scene {
        WindowGroup {
            ContentView(
                transactions: $viewModel.transactionsState.transactions,
                appSettings: viewModel.appSettings,
                currentAnchorDate: viewModel.currentAnchorDate
            )
            .sheet(isPresented: $viewModel.isShowSetupView, onDismiss: {
                viewModel.setShowSetupView(!viewModel.appSettings.isSetup)
            }) {
                NavigationStack {
                    SetupView(appSettings: $viewModel.appSettings.wrappedValue, balance: $viewModel.balance)
                        .toolbar {
                            ToolbarItem(placement: .confirmationAction) {
                                Button("Confirm") {
                                    viewModel.appSettings.isSetup = true
                                    viewModel.initAnchorDates(currentBalance: $viewModel.balance.wrappedValue)
                                    viewModel.setShowSetupView(false)
                                }
                            }
                        }
                }
            }
            .onAppear() {
                viewModel.initAnchorDates()
            }
        }
    }
}
