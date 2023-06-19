//
//  AnchorDatesState.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 19.06.23.
//

import Foundation

class AnchorDatesState: ObservableObject {
    @Published var anchorDates: [AnchorDate]
    
    init(anchorDates: [AnchorDate]) {
        self.anchorDates = anchorDates
    }
    
    func addAnchorDate(_ newAnchorDate: AnchorDate) -> Void {
        anchorDates.append(newAnchorDate)
    }
}
