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
            anchorDate: .constant(AnchorDate(startDate: Date(), balance: 1000)),
            currentValue: .constant(100),
            currencySymbol: .constant("$")
        )
    }
}
