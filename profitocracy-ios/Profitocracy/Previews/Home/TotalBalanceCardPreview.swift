//
//  TotalBalanceCardPreview.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI


struct TotalBalanceCardViiew_Previews: PreviewProvider {
    static var previews: some View {
        TotalBalanceCardView(
            anchorDate: AnchorDate(startDate: Date(), balance: 1000),
            nextDate: Date(),
            currentValue: 100,
            currencySymbol: "$"
        )
    }
}
