//
//  SettingsViewModel.swift
//  Profitocracy
//
//  Created by Anton Gavrilov on 23.06.23.
//

import Foundation
import SwiftUI

class SettingsViewModel: ObservableObject {
    @Binding var appSettings: AppSettings
    
    init(appSettings: Binding<AppSettings>) {
        self._appSettings = appSettings
    }
}
