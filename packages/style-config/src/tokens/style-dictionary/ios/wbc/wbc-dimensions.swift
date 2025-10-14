// Do not edit directly, this file was auto-generated.

import UIKit 

public enum WBCLightDimensions {
  public static let BorderRoundedNone = CGFloat(0.00)
  public static let BorderRoundedSm = CGFloat(3.00)
  public static let BorderRoundedMd = CGFloat(4.00)
  public static let BorderRoundedLg = CGFloat(5.00)
  public static let BorderRoundedXl = CGFloat(6.00)
  public static let BorderRounded2xl = CGFloat(8.00)
  public static let BorderRounded3xl = CGFloat(12.00)
  public static let BorderRounded4xl = CGFloat(16.00)
  public static let BorderRounded5xl = CGFloat(24.00)
  public static let BorderRoundedFull = CGFloat(999.00)
}


public enum WBCDarkDimensions {
  public static let BorderRoundedNone = CGFloat(0.00)
  public static let BorderRoundedSm = CGFloat(3.00)
  public static let BorderRoundedMd = CGFloat(4.00)
  public static let BorderRoundedLg = CGFloat(5.00)
  public static let BorderRoundedXl = CGFloat(6.00)
  public static let BorderRounded2xl = CGFloat(8.00)
  public static let BorderRounded3xl = CGFloat(12.00)
  public static let BorderRounded4xl = CGFloat(16.00)
  public static let BorderRounded5xl = CGFloat(24.00)
  public static let BorderRoundedFull = CGFloat(999.00)
}


public enum WBCDimensions {

  public static var BorderRoundedNone: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCDarkDimensions.BorderRoundedNone)
    default:
      return Double(WBCLightDimensions.BorderRoundedNone)
    }
  }

  public static var BorderRoundedSm: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCDarkDimensions.BorderRoundedSm)
    default:
      return Double(WBCLightDimensions.BorderRoundedSm)
    }
  }

  public static var BorderRoundedMd: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCDarkDimensions.BorderRoundedMd)
    default:
      return Double(WBCLightDimensions.BorderRoundedMd)
    }
  }

  public static var BorderRoundedLg: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCDarkDimensions.BorderRoundedLg)
    default:
      return Double(WBCLightDimensions.BorderRoundedLg)
    }
  }

  public static var BorderRoundedXl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCDarkDimensions.BorderRoundedXl)
    default:
      return Double(WBCLightDimensions.BorderRoundedXl)
    }
  }

  public static var BorderRounded2xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCDarkDimensions.BorderRounded2xl)
    default:
      return Double(WBCLightDimensions.BorderRounded2xl)
    }
  }

  public static var BorderRounded3xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCDarkDimensions.BorderRounded3xl)
    default:
      return Double(WBCLightDimensions.BorderRounded3xl)
    }
  }

  public static var BorderRounded4xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCDarkDimensions.BorderRounded4xl)
    default:
      return Double(WBCLightDimensions.BorderRounded4xl)
    }
  }

  public static var BorderRounded5xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCDarkDimensions.BorderRounded5xl)
    default:
      return Double(WBCLightDimensions.BorderRounded5xl)
    }
  }

  public static var BorderRoundedFull: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBCDarkDimensions.BorderRoundedFull)
    default:
      return Double(WBCLightDimensions.BorderRoundedFull)
    }
  }

}
