// Do not edit directly, this file was auto-generated.

import UIKit 

public enum WBCPrimitivesDimension {
  public static let PrimitivesBorderRadiusNone = 0
  public static let PrimitivesBorderRadius3px = 3
  public static let PrimitivesBorderRadius4px = 4
  public static let PrimitivesBorderRadius5px = 5
  public static let PrimitivesBorderRadius6px = 6
  public static let PrimitivesBorderRadius8px = 8
  public static let PrimitivesBorderRadius12px = 12
  public static let PrimitivesBorderRadius16px = 16
  public static let PrimitivesBorderRadius24px = 24
  public static let PrimitivesBorderRadiusFull = 999
  public static let ThemesWestpacBorderRadiusNone = 0
  public static let ThemesWestpacBorderRadiusSm = 3
  public static let ThemesWestpacBorderRadiusMd = 4
  public static let ThemesWestpacBorderRadiusLg = 5
  public static let ThemesWestpacBorderRadiusXl = 6
  public static let ThemesWestpacBorderRadius2xl = 8
  public static let ThemesWestpacBorderRadius3xl = 12
  public static let ThemesWestpacBorderRadius4xl = 16
  public static let ThemesWestpacBorderRadius5xl = 24
  public static let ThemesWestpacBorderRadiusFull = 999
}


public enum WBCLightDimensions {
  public static let BorderRoundedNone = WBCPrimitivesDimension.ThemesWestpacBorderRadiusNone
  public static let BorderRoundedSm = WBCPrimitivesDimension.ThemesWestpacBorderRadiusSm
  public static let BorderRoundedMd = WBCPrimitivesDimension.ThemesWestpacBorderRadiusMd
  public static let BorderRoundedLg = WBCPrimitivesDimension.ThemesWestpacBorderRadiusLg
  public static let BorderRoundedXl = WBCPrimitivesDimension.ThemesWestpacBorderRadiusXl
  public static let BorderRounded2xl = WBCPrimitivesDimension.ThemesWestpacBorderRadius2xl
  public static let BorderRounded3xl = WBCPrimitivesDimension.ThemesWestpacBorderRadius3xl
  public static let BorderRounded4xl = WBCPrimitivesDimension.ThemesWestpacBorderRadius4xl
  public static let BorderRounded5xl = WBCPrimitivesDimension.ThemesWestpacBorderRadius5xl
  public static let BorderRoundedFull = WBCPrimitivesDimension.ThemesWestpacBorderRadiusFull
}


public enum WBCDarkDimensions {
  public static let BorderRoundedNone = WBCPrimitivesDimension.ThemesWestpacBorderRadiusNone
  public static let BorderRoundedSm = WBCPrimitivesDimension.ThemesWestpacBorderRadiusSm
  public static let BorderRoundedMd = WBCPrimitivesDimension.ThemesWestpacBorderRadiusMd
  public static let BorderRoundedLg = WBCPrimitivesDimension.ThemesWestpacBorderRadiusLg
  public static let BorderRoundedXl = WBCPrimitivesDimension.ThemesWestpacBorderRadiusXl
  public static let BorderRounded2xl = WBCPrimitivesDimension.ThemesWestpacBorderRadius2xl
  public static let BorderRounded3xl = WBCPrimitivesDimension.ThemesWestpacBorderRadius3xl
  public static let BorderRounded4xl = WBCPrimitivesDimension.ThemesWestpacBorderRadius4xl
  public static let BorderRounded5xl = WBCPrimitivesDimension.ThemesWestpacBorderRadius5xl
  public static let BorderRoundedFull = WBCPrimitivesDimension.ThemesWestpacBorderRadiusFull
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
