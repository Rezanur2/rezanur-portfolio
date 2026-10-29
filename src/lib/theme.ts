export const THEME_STORAGE_KEY = "rezanur-portfolio-theme";

/**
 * Runs in <head> before the first paint. Uses a saved choice when available,
 * otherwise follows the operating system, and falls back to the light theme.
 */
export const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}",s=localStorage.getItem(k),t=s==="light"||s==="dark"?s:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;
