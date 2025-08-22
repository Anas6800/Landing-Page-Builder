export function getThemeClasses(theme: string) {
    switch (theme) {
      case "light":
        return "bg-white text-black";
      case "dark":
        return "bg-gray-900 text-white";
      case "gradient":
        return "bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 text-white";
      default:
        return "bg-white text-black";
    }
  }
  