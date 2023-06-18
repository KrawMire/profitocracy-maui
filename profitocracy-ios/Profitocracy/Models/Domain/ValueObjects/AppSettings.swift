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
    
    var anchorDays: [Int]
    var theme: Theme
    
    init(
        categories: [SpendCategory],
        anchorDays: [Int],
        theme: Theme,
        mainCurrency: Currency
    ) {
        self.mainCurrency = mainCurrency
        self.categories = categories
        self.anchorDays = anchorDays
        self.theme = theme
    }
}
