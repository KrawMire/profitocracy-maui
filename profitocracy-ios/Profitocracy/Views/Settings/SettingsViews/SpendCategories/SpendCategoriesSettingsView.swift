//
//  ExpenseCategoriesSettingsView.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 12.06.23.
//

import SwiftUI

struct SpendCategoriesSettingsView: View {
    @ObservedObject var appSettings: AppSettings
    
    @State private var trackingCategories: [SpendCategory] = []
    @State private var nonTrackingCategories: [SpendCategory] = []
    
    @State private var editingCategory = SpendCategory.emptyCategory
    @State private var isShowEditView = false
    @State private var isNewCategory = true
    
    init(appSettings: AppSettings) {
        self.appSettings = appSettings

        separateCategories()
    }
    
    private func separateCategories() {
        trackingCategories = appSettings.categories.filter({ $0.isTracking == true })
        nonTrackingCategories = appSettings.categories.filter({ $0.isTracking == false })
    }
    
    var body: some View {
        VStack {
            if appSettings.categories.count != 0 {
                List {
                    if $trackingCategories.count != 0 {
                        Section("Tracked Categories") {
                            ForEach($trackingCategories) { category in
                                SpendCategoryCard(
                                    category: category,
                                    currencySymbol: $appSettings.mainCurrency.symbol
                                )
                            }
                        }
                    }
                    
                    if $nonTrackingCategories.count != 0 {
                        Section("Not Tracked Categories") {
                            ForEach($nonTrackingCategories) { category in
                                SpendCategoryCard(
                                    category: category,
                                    currencySymbol: $appSettings.mainCurrency.symbol
                                )
                            }
                        }
                    }
                }
            } else {
                Text("There is no exising categories")
                    .foregroundColor(.gray)
            }
        }
        .toolbar() {
            Button(action: {
                isShowEditView = true
            }) {
                Image(systemName: "plus.circle.fill")
            }
        }
        .sheet(isPresented: $isShowEditView) {
            NavigationStack {
                SpendCategoryEditView(category: $editingCategory)
                    .navigationTitle("New Category")
                    .toolbar() {
                        ToolbarItem(placement: .cancellationAction) {
                            Button("Cancel") {
                                isShowEditView = false
                                editingCategory = SpendCategory.emptyCategory
                            }
                        }
                        ToolbarItem(placement: .confirmationAction) {
                            Button("Add") {
                                appSettings.categories.append(editingCategory)
                                isShowEditView = false
                                editingCategory = SpendCategory.emptyCategory
                            }
                        }
                    }
            }
        }
        .onChange(of: appSettings.categories) { _ in
            separateCategories()
        }
        .onAppear() {
            separateCategories()
        }
    }
}

