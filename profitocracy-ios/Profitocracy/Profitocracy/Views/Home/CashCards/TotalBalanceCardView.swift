//
//  .swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct TotalBalanceCardView: View {
    var body: some View {
        VStack {
            Text("Total Balance")
                .font(.headline)
                .frame(maxWidth: .infinity, alignment: .leading)
            Text("10.06.2023-25.06.2023")
                .font(.subheadline)
                .frame(maxWidth: .infinity, alignment: .leading)
            ProgressView(value: 2500, total: 15000)
            HStack {
                Text("$2500")
                    .font(.caption)
                Spacer()
                Text("$15000")
                    .font(.caption)
            }
        }
        .padding()
    }
}

struct TotalBalanceCardViiew_Previews: PreviewProvider {
    static var previews: some View {
        TotalBalanceCardView()
    }
}
