//
//  AudioUtility.swift
//  SeventhAve
//
//  Created by Dominic Cobb on 4/27/21.
//

import Foundation
import AVFoundation

@objc(AudioUtility)
class AudioUtility: NSObject {
  
  private var count = 0
  private let audioSession = AVAudioSession.sharedInstance()
  
  @objc
  func increment() {
    count += 1
    print("count is \(count)")
  }

  
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["initialCount": 0, "Session": audioSession]
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}


