// Do not edit directly, this file was auto-generated.

import UIKit 

public enum WBC26LightDimensions {
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




public enum WBC26Dimensions {

  public static var BorderRoundedNone: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBC26DarkDimensions.BorderRoundedNone)
    default:
      return Double(WBC26LightDimensions.BorderRoundedNone)
    }
  }

  public static var BorderRoundedSm: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBC26DarkDimensions.BorderRoundedSm)
    default:
      return Double(WBC26LightDimensions.BorderRoundedSm)
    }
  }

  public static var BorderRoundedMd: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBC26DarkDimensions.BorderRoundedMd)
    default:
      return Double(WBC26LightDimensions.BorderRoundedMd)
    }
  }

  public static var BorderRoundedLg: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBC26DarkDimensions.BorderRoundedLg)
    default:
      return Double(WBC26LightDimensions.BorderRoundedLg)
    }
  }

  public static var BorderRoundedXl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBC26DarkDimensions.BorderRoundedXl)
    default:
      return Double(WBC26LightDimensions.BorderRoundedXl)
    }
  }

  public static var BorderRounded2xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBC26DarkDimensions.BorderRounded2xl)
    default:
      return Double(WBC26LightDimensions.BorderRounded2xl)
    }
  }

  public static var BorderRounded3xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBC26DarkDimensions.BorderRounded3xl)
    default:
      return Double(WBC26LightDimensions.BorderRounded3xl)
    }
  }

  public static var BorderRounded4xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBC26DarkDimensions.BorderRounded4xl)
    default:
      return Double(WBC26LightDimensions.BorderRounded4xl)
    }
  }

  public static var BorderRounded5xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBC26DarkDimensions.BorderRounded5xl)
    default:
      return Double(WBC26LightDimensions.BorderRounded5xl)
    }
  }

  public static var BorderRoundedFull: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(WBC26DarkDimensions.BorderRoundedFull)
    default:
      return Double(WBC26LightDimensions.BorderRoundedFull)
    }
  }

}
