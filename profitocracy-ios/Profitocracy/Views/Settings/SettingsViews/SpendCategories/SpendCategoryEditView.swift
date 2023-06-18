//
//  SpendCategoryEditView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 18.06.23.
//

import SwiftUI

struct SpendCategoryEditView: View {
    @Binding var category: SpendCategory
    
    @State private var isSpecifyAmount = false
    
    private let amountFormatter: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        return formatter
    }()
    
    private var plannedAmount: Binding<Float> {
        Binding<Float>(
            get: {
                return self.category.plannedAmount ?? 0
            },
            set: { newValue in
                self.category.plannedAmount = newValue != 0 ? newValue : nil
            }
        )
    }
    
    var body: some View {
        Form {
            Section {
                TextField("Category name", text: $category.name)
                Toggle("Display on Home screen", isOn: $category.isTracking)
            }
            Section {
                Toggle("Set Planned Amount", isOn: $isSpecifyAmount)
                
                if isSpecifyAmount {
                    TextField("Planned amount", value: plannedAmount, formatter: amountFormatter)
                        .keyboardType(.decimalPad)
                }
            }
        }
    }
}

struct SpendCategoryEditView_Previews: PreviewProvider {
    static var previews: some View {
        SpendCategoryEditView(category: .constant(SpendCategory.emptyCategory))
    }
}
