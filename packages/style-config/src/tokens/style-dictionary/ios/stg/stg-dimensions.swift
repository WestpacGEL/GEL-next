// Do not edit directly, this file was auto-generated.

import UIKit 

public enum STGLightDimensions {
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


public enum STGDarkDimensions {
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


public enum STGDimensions {

  public static var BorderRoundedNone: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(STGDarkDimensions.BorderRoundedNone)
    default:
      return Double(STGLightDimensions.BorderRoundedNone)
    }
  }

  public static var BorderRoundedSm: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(STGDarkDimensions.BorderRoundedSm)
    default:
      return Double(STGLightDimensions.BorderRoundedSm)
    }
  }

  public static var BorderRoundedMd: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(STGDarkDimensions.BorderRoundedMd)
    default:
      return Double(STGLightDimensions.BorderRoundedMd)
    }
  }

  public static var BorderRoundedLg: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(STGDarkDimensions.BorderRoundedLg)
    default:
      return Double(STGLightDimensions.BorderRoundedLg)
    }
  }

  public static var BorderRoundedXl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(STGDarkDimensions.BorderRoundedXl)
    default:
      return Double(STGLightDimensions.BorderRoundedXl)
    }
  }

  public static var BorderRounded2xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(STGDarkDimensions.BorderRounded2xl)
    default:
      return Double(STGLightDimensions.BorderRounded2xl)
    }
  }

  public static var BorderRounded3xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(STGDarkDimensions.BorderRounded3xl)
    default:
      return Double(STGLightDimensions.BorderRounded3xl)
    }
  }

  public static var BorderRounded4xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(STGDarkDimensions.BorderRounded4xl)
    default:
      return Double(STGLightDimensions.BorderRounded4xl)
    }
  }

  public static var BorderRounded5xl: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(STGDarkDimensions.BorderRounded5xl)
    default:
      return Double(STGLightDimensions.BorderRounded5xl)
    }
  }

  public static var BorderRoundedFull: Double {
    switch UIScreen.main.traitCollection.userInterfaceStyle {
    case .dark:
      return Double(STGDarkDimensions.BorderRoundedFull)
    default:
      return Double(STGLightDimensions.BorderRoundedFull)
    }
  }

}
