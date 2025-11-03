// Do not edit directly, this file was auto-generated.

import UIKit 

public enum BSALightDimensions {
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


public enum BSADarkDimensions {
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


public enum BSADimensions {

  public static var BorderRoundedNone: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(BSADarkDimensions.BorderRoundedNone)
    default:
      return Double(BSALightDimensions.BorderRoundedNone)
    }
  }

  public static var BorderRoundedSm: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(BSADarkDimensions.BorderRoundedSm)
    default:
      return Double(BSALightDimensions.BorderRoundedSm)
    }
  }

  public static var BorderRoundedMd: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(BSADarkDimensions.BorderRoundedMd)
    default:
      return Double(BSALightDimensions.BorderRoundedMd)
    }
  }

  public static var BorderRoundedLg: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(BSADarkDimensions.BorderRoundedLg)
    default:
      return Double(BSALightDimensions.BorderRoundedLg)
    }
  }

  public static var BorderRoundedXl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(BSADarkDimensions.BorderRoundedXl)
    default:
      return Double(BSALightDimensions.BorderRoundedXl)
    }
  }

  public static var BorderRounded2xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(BSADarkDimensions.BorderRounded2xl)
    default:
      return Double(BSALightDimensions.BorderRounded2xl)
    }
  }

  public static var BorderRounded3xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(BSADarkDimensions.BorderRounded3xl)
    default:
      return Double(BSALightDimensions.BorderRounded3xl)
    }
  }

  public static var BorderRounded4xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(BSADarkDimensions.BorderRounded4xl)
    default:
      return Double(BSALightDimensions.BorderRounded4xl)
    }
  }

  public static var BorderRounded5xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(BSADarkDimensions.BorderRounded5xl)
    default:
      return Double(BSALightDimensions.BorderRounded5xl)
    }
  }

  public static var BorderRoundedFull: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(BSADarkDimensions.BorderRoundedFull)
    default:
      return Double(BSALightDimensions.BorderRoundedFull)
    }
  }

}
