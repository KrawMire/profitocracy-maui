//
//  AppSettings.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 28.04.23.
//

import Foundation

class AppSettings: ObservableObject, Codable {
    @Published var mainCurrency: Currency {
        didSet {
            saveAppSettings()
        }
    }
    
    @Published var categories: [SpendCategory] {
        didSet {
            saveAppSettings()
        }
    }
    
    @Published var anchorDays: [Int] {
        didSet {
            saveAppSettings()
        }
    }
    
    @Published var theme: Theme {
        didSet {
            saveAppSettings()
        }
    }
    
    @Published var isSetup: Bool {
        didSet {
            saveAppSettings()
        }
    }
    
    private func saveAppSettings() {
        if let appSettingsData = try? JSONEncoder().encode(self) {
            UserDefaults.standard.set(appSettingsData, forKey: DefaultKeys.appSettings.rawValue)
        }
    }
    
    enum CodingKeys: String, CodingKey {
        case mainCurrency
        case categories
        case anchorDays
        case theme
        case isSetup
    }
    
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
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        mainCurrency = try container.decode(Currency.self, forKey: .mainCurrency)
        categories = try container.decode([SpendCategory].self, forKey: .categories)
        anchorDays = try container.decode([Int].self, forKey: .anchorDays)
        theme = try container.decode(Theme.self, forKey: .theme)
        isSetup = try container.decode(Bool.self, forKey: .isSetup)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(mainCurrency, forKey: .mainCurrency)
        try container.encode(categories, forKey: .categories)
        try container.encode(anchorDays, forKey: .anchorDays)
        try container.encode(theme, forKey: .theme)
        try container.encode(isSetup, forKey: .isSetup)
    }
}
