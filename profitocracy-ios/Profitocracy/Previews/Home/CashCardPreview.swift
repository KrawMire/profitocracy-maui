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
            current: .constant(10),
            total: .constant(1500),
            currencySymbol: .constant("$")
        )
    }
}
