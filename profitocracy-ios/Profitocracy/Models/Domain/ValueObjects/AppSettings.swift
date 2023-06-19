//
//  AppSettings.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

class AppSettings: ObservableObject {
    @Published var mainCurrency: Currency
    @Published var categories: [SpendCategory]
    @Published var anchorDays: [Int]
    @Published var theme: Theme
    @Published var isSetup: Bool
    
    init(
        categories: [SpendCategory],
        anchorDays: [Int],
        theme: Theme,
        mainCurrency: Currency,
        isSetup: Bool
    ) {
        self.mainCurrency = mainCurrency
        self.categories = categories
        self.anchorDays = anchorDays
        self.theme = theme
        self.isSetup = isSetup
    }
}
