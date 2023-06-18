//
//  TotalBalanceCardView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct TotalBalanceCardView: View {
    @Binding var anchorDate: AnchorDate
    @Binding var currentValue: Float
    var currencySymbol: String
    
    private var startDate: String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "dd.MM.YYYY"
        
        return dateFormatter.string(from: anchorDate.startDate)
    }
    
    var body: some View {
        VStack {
            Text("Balance")
                .font(.headline)
                .frame(maxWidth: .infinity, alignment: .leading)
            Text("\(startDate)-25.06.2023")
                .font(.subheadline)
                .frame(maxWidth: .infinity, alignment: .leading)
            ProgressView(value: currentValue, total: anchorDate.balance)
            HStack {
                Text("\(currencySymbol)\(roundFloatString(currentValue))")
                    .font(.caption)
                Spacer()
                Text("\(currencySymbol)\(roundFloatString(anchorDate.balance))")
                    .font(.caption)
            }
        }
        .padding()
    }
}
