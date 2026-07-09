// Keyboard handler for elements with role="button": activate on Enter or Space only.
export const keyboardActivate = fn => e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault()
    fn(e)
  }
}
