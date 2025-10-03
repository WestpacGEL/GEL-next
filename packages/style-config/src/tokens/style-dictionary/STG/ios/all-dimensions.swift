// Do not edit directly, this file was auto-generated.

import UIKit 

public enum STGPrimitivesDimension {
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
  public static let ThemesStGeorgeBorderRadiusNone = 0
  public static let ThemesStGeorgeBorderRadiusSm = 3
  public static let ThemesStGeorgeBorderRadiusMd = 4
  public static let ThemesStGeorgeBorderRadiusLg = 5
  public static let ThemesStGeorgeBorderRadiusXl = 6
  public static let ThemesStGeorgeBorderRadius2xl = 8
  public static let ThemesStGeorgeBorderRadius3xl = 12
  public static let ThemesStGeorgeBorderRadius4xl = 16
  public static let ThemesStGeorgeBorderRadius5xl = 24
  public static let ThemesStGeorgeBorderRadiusFull = 999
}


public enum STGLightDimensions {
  public static let BorderRoundedNone = STGPrimitivesDimension.ThemesStGeorgeBorderRadiusNone
  public static let BorderRoundedSm = STGPrimitivesDimension.ThemesStGeorgeBorderRadiusSm
  public static let BorderRoundedMd = STGPrimitivesDimension.ThemesStGeorgeBorderRadiusMd
  public static let BorderRoundedLg = STGPrimitivesDimension.ThemesStGeorgeBorderRadiusLg
  public static let BorderRoundedXl = STGPrimitivesDimension.ThemesStGeorgeBorderRadiusXl
  public static let BorderRounded2xl = STGPrimitivesDimension.ThemesStGeorgeBorderRadius2xl
  public static let BorderRounded3xl = STGPrimitivesDimension.ThemesStGeorgeBorderRadius3xl
  public static let BorderRounded4xl = STGPrimitivesDimension.ThemesStGeorgeBorderRadius4xl
  public static let BorderRounded5xl = STGPrimitivesDimension.ThemesStGeorgeBorderRadius5xl
  public static let BorderRoundedFull = STGPrimitivesDimension.ThemesStGeorgeBorderRadiusFull
}


public enum STGDarkDimensions {
  public static let BorderRoundedNone = STGPrimitivesDimension.ThemesStGeorgeBorderRadiusNone
  public static let BorderRoundedSm = STGPrimitivesDimension.ThemesStGeorgeBorderRadiusSm
  public static let BorderRoundedMd = STGPrimitivesDimension.ThemesStGeorgeBorderRadiusMd
  public static let BorderRoundedLg = STGPrimitivesDimension.ThemesStGeorgeBorderRadiusLg
  public static let BorderRoundedXl = STGPrimitivesDimension.ThemesStGeorgeBorderRadiusXl
  public static let BorderRounded2xl = STGPrimitivesDimension.ThemesStGeorgeBorderRadius2xl
  public static let BorderRounded3xl = STGPrimitivesDimension.ThemesStGeorgeBorderRadius3xl
  public static let BorderRounded4xl = STGPrimitivesDimension.ThemesStGeorgeBorderRadius4xl
  public static let BorderRounded5xl = STGPrimitivesDimension.ThemesStGeorgeBorderRadius5xl
  public static let BorderRoundedFull = STGPrimitivesDimension.ThemesStGeorgeBorderRadiusFull
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
