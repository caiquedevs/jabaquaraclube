export function deviceIsAndroid(): boolean {
  return /Android/i.test(navigator.userAgent);
}
