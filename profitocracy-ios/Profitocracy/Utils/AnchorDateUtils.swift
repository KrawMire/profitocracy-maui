//
//  AnchorDateUtils.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 19.06.23.
//

import Foundation

func getCurrentDateComponents() -> DateComponents {
    let currentDate = Date()
    let dateComponents = Calendar.current.dateComponents([.day, .month, .year], from: currentDate)
    
    return dateComponents
}

func getNextAnchorDate(currentAnchorDate: AnchorDate, anchorDays: [Int]) -> Date {
    let currentAnchorDateComponents = Calendar.current.dateComponents([.day, .month, .year], from: currentAnchorDate.startDate)
    let currentDateComponents = Calendar.current.dateComponents([.day, .month, .year], from: Date())
    
    for anchorDayIndex in anchorDays.indices {
        var anchorDay = anchorDays[anchorDayIndex]
        
        if currentAnchorDateComponents.day! < anchorDay {
            return Calendar.current.date(
                from: DateComponents(year: currentDateComponents.year!, month: currentDateComponents.month!, day: anchorDay)
            )!
        }
        
        if (anchorDayIndex == anchorDays.count - 1) {
            anchorDay = anchorDays.first!
            var nextDateMonth = currentDateComponents.month!
            var nextDateYear = currentDateComponents.year!
            
            if (currentDateComponents.day! > anchorDay) {
                nextDateMonth = currentDateComponents.month! == 12 ? 1 : currentDateComponents.month! + 1
                nextDateYear = currentDateComponents.month! == 12 ? currentDateComponents.year! + 1 : currentDateComponents.year!
            }
            
            return Calendar.current.date(
                from: DateComponents(year: nextDateYear, month: nextDateMonth, day: anchorDay)
            )!
        }
    }
    
    return currentAnchorDate.startDate
}
