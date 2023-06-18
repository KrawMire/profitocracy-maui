//
//  AddTransactionPreview.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI


struct AddTransactionView_Previews: PreviewProvider {
    static var previews: some View {
        AddTransactionView(
            transaction: .constant(Transaction.emptyTransaction),
            categories: .constant([SpendCategory]())
        )
    }
}
