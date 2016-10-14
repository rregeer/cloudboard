export function isMobileBrowser() {
  const ua = navigator.userAgent.toLowerCase()
  return !!ua.match(/ipad|iphone|ipod|android|iemobile/) && !window.MSStream
}
