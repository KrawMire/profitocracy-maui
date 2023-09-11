//
//  AppViewModel.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 20.06.23.
//

import Foundation
import SwiftUI

class AppViewModel : ObservableObject {
    @Published var isShowSetupView: Bool
    @Published var balance: Float
    
    @Published var currentAnchorDate: AnchorDate
    
    @Published var currencyRatesState: CurrencyRatesState
    @Published var transactionsState: TransactionsState
    @Published var appSettings: AppSettings
    @Published var anchorDatesState: AnchorDatesState
    
    init() {
        balance = 0
        isShowSetupView = false
        appSettings = AppSettings(
            categories: [],
            anchorDays: [10, 25],
            theme: .system,
            mainCurrency: Currency.availableCurrencies[0],
            isSetup: false
        )
        currencyRatesState = CurrencyRatesState(currencyRates: [])
        transactionsState = TransactionsState(transactions: [])
        anchorDatesState = AnchorDatesState(anchorDates: [])
        currentAnchorDate = AnchorDate(
            startDate: Date(),
            balance: 0
        )
        
        loadData()
        isShowSetupView = !appSettings.isSetup
        initAnchorDates()
        loadCurrencyRates()
    }
    
    func loadData() {
        // Load anchor dates from UserDefaults
        if let anchorDatesData = UserDefaults.standard.data(forKey: DefaultKeys.anchorDates.rawValue) {
            if let anchorDatesState = try? JSONDecoder().decode(AnchorDatesState.self, from: anchorDatesData) {
                self.anchorDatesState = anchorDatesState
            }
        }
        
        // Load transactions from UserDefaults
        if let transactionsData = UserDefaults.standard.data(forKey: DefaultKeys.transactions.rawValue) {
            if let transactionsState = try? JSONDecoder().decode(TransactionsState.self, from: transactionsData) {
                self.transactionsState = transactionsState
            }
        }
        
        // Load app settings from UserDefaults
        if let appSettingsData = UserDefaults.standard.data(forKey: DefaultKeys.appSettings.rawValue) {
            if let appSettings = try? JSONDecoder().decode(AppSettings.self, from: appSettingsData) {
                self.appSettings = appSettings
            }
        }
        
        if let currencyRatesData = UserDefaults.standard.data(forKey: DefaultKeys.currencyRates.rawValue) {
            if let currencyRatesState = try? JSONDecoder().decode(CurrencyRatesState.self, from: currencyRatesData) {
                self.currencyRatesState = currencyRatesState
            }
        }
    }
    
    func setShowSetupView(_ value: Bool) {
        isShowSetupView = value
    }
    
    func initAnchorDates(currentBalance: Float? = nil) -> Void {
        if !appSettings.isSetup {
            return
        }
        
        let lastAnchorDate = anchorDatesState.anchorDates.last
        let currentDateComponents = getCurrentDateComponents()
        
        var nearestAnchorDay: Int? = nil
        var anchorDateMonth = currentDateComponents.month!
        var anchorDateYear = currentDateComponents.year!
        
        for anchorDay in appSettings.anchorDays {
            if anchorDay <= currentDateComponents.day! {
                nearestAnchorDay = anchorDay
                continue
            }
            
            if (nearestAnchorDay == nil && anchorDay == appSettings.anchorDays.last) {
                anchorDateMonth = anchorDateMonth == 1 ? 12 : anchorDateMonth - 1;
                anchorDateYear = anchorDateMonth == 1 ? anchorDateYear + 1 : anchorDateYear;
                nearestAnchorDay = anchorDay
            }
        }
        
        let newAnchorDateBalance = currentBalance ?? lastAnchorDate!.balance
        let newAnchorDateDate = Calendar.current.date(
            from: DateComponents(year: currentDateComponents.year, month: anchorDateMonth, day: nearestAnchorDay)
        )
        
        let newAnchorDate = createAnchorDate(date: newAnchorDateDate!, balance: newAnchorDateBalance)
        
        if (lastAnchorDate == nil) {
            anchorDatesState.addAnchorDate(newAnchorDate)
            currentAnchorDate = newAnchorDate
            
            return
        }
        
        let lastAnchorDateComponents = Calendar.current.dateComponents([.day, .month, .year], from: lastAnchorDate!.startDate)
        
        if (lastAnchorDateComponents.day! != currentDateComponents.day!
            || lastAnchorDateComponents.month! != currentDateComponents.month!
            || lastAnchorDateComponents.year! != currentDateComponents.year!
        ) {
            anchorDatesState.addAnchorDate(newAnchorDate)
            currentAnchorDate = newAnchorDate
            
            return
        }
        
        currentAnchorDate = lastAnchorDate!
    }
    
    private func createAnchorDate(date: Date, balance: Float) -> AnchorDate {
        return AnchorDate(startDate: date, balance: balance)
    }
    
    private func loadCurrencyRates() {
        CurrencyService.getCurrencyRate(baseCurrency: appSettings.mainCurrency) { result in
            switch result {
            case .success(let response):
                var rates = [CurrencyRate]()
                
                for currency in Currency.availableCurrencies {
                    let rate = response.rates[currency.code]
                    
                    if (rate != nil) {
                        rates.append(CurrencyRate(currency: currency, rate: Float(rate!)))
                    }
                }
                
                self.currencyRatesState = CurrencyRatesState(currencyRates: rates)
            default:
                let _ = "Error!"
            }
        }
    }
}
