//
//  AnchorDatesState.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 19.06.23.
//

import Foundation

class AnchorDatesState: ObservableObject, Codable {
    @Published var anchorDates: [AnchorDate] {
        didSet {
            saveAnchorDatesState()
        }
    }
    
    private func saveAnchorDatesState() {
        if let anchorDatesData = try? JSONEncoder().encode(self) {
            UserDefaults.standard.set(anchorDatesData, forKey: DefaultKeys.anchorDates.rawValue)
        }
    }
    
    enum CodingKeys: String, CodingKey {
        case anchorDates
    }
    
    init(anchorDates: [AnchorDate]) {
        self.anchorDates = anchorDates
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        anchorDates = try container.decode([AnchorDate].self, forKey: .anchorDates)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(anchorDates, forKey: .anchorDates)
    }
    
    func addAnchorDate(_ newAnchorDate: AnchorDate) {
        anchorDates.append(newAnchorDate)
    }
}
