export function isPwdValid(value) {
  const lowerCase = /[a-z]/.test(value);
  const upperCase = /[A-Z]/.test(value);
  const digit = /[0-9]/.test(value);
  const symbol = /[!@#$%^&*]/.test(value);
  const len = value.length >= 8;

  if (!len || !lowerCase || !upperCase || !symbol || !digit) {
    return "Password should be minimum of 8 characters and must contain atleast 1 uppercase, 1 lowercase, 1 digit and a symbol";
  }
  return true;
}