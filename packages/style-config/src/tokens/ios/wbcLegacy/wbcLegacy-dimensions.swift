// Do not edit directly, this file was auto-generated.

import UIKit 

public enum WBCLEGACYLightDimensions {
  public static let BorderRoundedNone = 0
  public static let BorderRoundedSm = 3
  public static let BorderRoundedMd = 4
  public static let BorderRoundedLg = 5
  public static let BorderRoundedXl = 6
  public static let BorderRounded2xl = 8
  public static let BorderRounded3xl = 12
  public static let BorderRounded4xl = 16
  public static let BorderRounded5xl = 24
  public static let BorderRoundedFull = 999
}


public enum WBCLEGACYDarkDimensions {
  public static let BorderRoundedNone = 0
  public static let BorderRoundedSm = 3
  public static let BorderRoundedMd = 4
  public static let BorderRoundedLg = 5
  public static let BorderRoundedXl = 6
  public static let BorderRounded2xl = 8
  public static let BorderRounded3xl = 12
  public static let BorderRounded4xl = 16
  public static let BorderRounded5xl = 24
  public static let BorderRoundedFull = 999
}




public enum WBCLEGACYDimensions {

  public static var BorderRoundedNone: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCLEGACYDarkDimensions.BorderRoundedNone)
    default:
      return Double(WBCLEGACYLightDimensions.BorderRoundedNone)
    }
  }

  public static var BorderRoundedSm: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCLEGACYDarkDimensions.BorderRoundedSm)
    default:
      return Double(WBCLEGACYLightDimensions.BorderRoundedSm)
    }
  }

  public static var BorderRoundedMd: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCLEGACYDarkDimensions.BorderRoundedMd)
    default:
      return Double(WBCLEGACYLightDimensions.BorderRoundedMd)
    }
  }

  public static var BorderRoundedLg: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCLEGACYDarkDimensions.BorderRoundedLg)
    default:
      return Double(WBCLEGACYLightDimensions.BorderRoundedLg)
    }
  }

  public static var BorderRoundedXl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCLEGACYDarkDimensions.BorderRoundedXl)
    default:
      return Double(WBCLEGACYLightDimensions.BorderRoundedXl)
    }
  }

  public static var BorderRounded2xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCLEGACYDarkDimensions.BorderRounded2xl)
    default:
      return Double(WBCLEGACYLightDimensions.BorderRounded2xl)
    }
  }

  public static var BorderRounded3xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCLEGACYDarkDimensions.BorderRounded3xl)
    default:
      return Double(WBCLEGACYLightDimensions.BorderRounded3xl)
    }
  }

  public static var BorderRounded4xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCLEGACYDarkDimensions.BorderRounded4xl)
    default:
      return Double(WBCLEGACYLightDimensions.BorderRounded4xl)
    }
  }

  public static var BorderRounded5xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCLEGACYDarkDimensions.BorderRounded5xl)
    default:
      return Double(WBCLEGACYLightDimensions.BorderRounded5xl)
    }
  }

  public static var BorderRoundedFull: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCLEGACYDarkDimensions.BorderRoundedFull)
    default:
      return Double(WBCLEGACYLightDimensions.BorderRoundedFull)
    }
  }

}
