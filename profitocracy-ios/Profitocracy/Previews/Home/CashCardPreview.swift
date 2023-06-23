//
//  CashCardPreview.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI

struct SavedAmountCard_Previews: PreviewProvider {
    static var previews: some View {
        CashCardView(
            title: "Saved amount",
            current: 10,
            total: 1500,
            currencySymbol: "$"
        )
    }
}
