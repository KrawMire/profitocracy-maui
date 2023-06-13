//
//  ContentView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 23.04.23.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("Home")
                }
            SettingsView()
                .tabItem {
                    Image(systemName: "gear")
                    Text("Settings")
                }
            TransactionsView(transactions: Transaction.previewData)
                .tabItem {
                    Image(systemName: "list.dash")
                    Text("Transactions")
                }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
