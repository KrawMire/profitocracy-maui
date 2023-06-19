//
//  ProfitocracyApp.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 23.04.23.
//

import SwiftUI

@main
struct ProfitocracyApp: App {
    @State private var isShowSetupView: Bool
    
    @State var transactions: [Transaction]
    @StateObject var appSettings: AppSettings
    @StateObject var currentAnchorDate: AnchorDate
    @StateObject var anchorDatesState: AnchorDatesState
    
    init() {
        isShowSetupView = false
        _appSettings = StateObject(wrappedValue: AppSettings(
            categories: [],
            anchorDays: [25],
            theme: .system,
            mainCurrency: Currency.availableCurrencies[0],
            isSetup: true
        ))
        _transactions = State(wrappedValue: [Transaction]())
        _anchorDatesState = StateObject(wrappedValue: AnchorDatesState(
            anchorDates: [])
        )
        _currentAnchorDate = StateObject(wrappedValue: AnchorDate(
            startDate: Date(),
            balance: 0
        ))
        
        isShowSetupView = !appSettings.isSetup
        initAnchorDates()
    }
    
    private mutating func initAnchorDates() -> Void {
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
        
        var lastAnchorDate = anchorDatesState.anchorDates.last
        
        let newAnchorDateDate = Calendar.current.date(
            from: DateComponents(year: currentDateComponents.year, month: anchorDateMonth, day: nearestAnchorDay)
        )
        
        let newAnchorDate = createAnchorDate(date: newAnchorDateDate!, balance: 100)
        
        if (lastAnchorDate == nil) {
            let newAnchorDate = createAnchorDate(date: newAnchorDateDate!, balance: 100)
            anchorDatesState.addAnchorDate(newAnchorDate)
            _currentAnchorDate = StateObject(wrappedValue: newAnchorDate)

            return
        }
        
        let lastAnchorDateComponents = Calendar.current.dateComponents([.day, .month, .year], from: lastAnchorDate!.startDate)
        
        if (lastAnchorDateComponents.day! != currentDateComponents.day!
            || lastAnchorDateComponents.month! != currentDateComponents.month!
            || lastAnchorDateComponents.year! != currentDateComponents.year!
        ) {
            anchorDatesState.addAnchorDate(newAnchorDate)
            _currentAnchorDate = StateObject(wrappedValue: newAnchorDate)
            
            return
        }
        
        _currentAnchorDate = StateObject(wrappedValue: lastAnchorDate!)
    }
    
    private func createAnchorDate(date: Date, balance: Float) -> AnchorDate {
        return AnchorDate(startDate: date, balance: balance)
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView(
                transactions: $transactions,
                appSettings: appSettings,
                currentAnchorDate: currentAnchorDate
            )
            .sheet(isPresented: $isShowSetupView, onDismiss: {
                // isShowSetupView = true
                isShowSetupView = false
            }) {
                SetupView(appSettings: appSettings)
            }
        }
    }
}
