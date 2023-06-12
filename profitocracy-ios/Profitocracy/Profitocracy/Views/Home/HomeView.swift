//
//  HomeView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct HomeView: View {
    let screenWidth = UIScreen.main.bounds.width
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading) {
                    TotalBalanceCardView()
                    CashCardView(
                        title: "Saved Amount",
                        current: 10,
                        total: 1500
                    )
                    Text("Cash for the Day")
                        .font(.title2)
                        .fontWeight(.bold)
                    HStack {
                        CashCardView(
                            title: "From Actual",
                            current: 10,
                            total: 120
                        )
                        Spacer()
                        CashCardView(
                            title: "From Initial",
                            current: 10,
                            total: 150
                        )
                    }
                    Text("Spending Types")
                        .font(.title2)
                        .fontWeight(.bold)
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack {
                            CashCardView(
                                title: "Main Spendings",
                                current: 1230,
                                total: 7500
                            )
                            .frame(width: screenWidth * 0.9)
                            CashCardView(
                                title: "Secondary Spendings",
                                current: 553,
                                total: 5000
                            )
                            .frame(width: screenWidth * 0.9)
                            CashCardView(
                                title: "Saved",
                                current: 1500,
                                total: 1500
                            )
                            .frame(width: screenWidth * 0.9)
                        }
                    }
                }
                .padding()
                .navigationTitle("Home")
                .toolbar() {
                    Button(action: {}) {
                        Image(systemName: "plus.circle.fill")
                    }
                }
            }
            Spacer()
        }
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            HomeView()
        }
    }
}
