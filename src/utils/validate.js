// Password validation Regex
// (?=.*[a-z]) → at least one lowercase letter
// (?=.*[A-Z]) → at least one uppercase letter
// (?=.*\d) → at least one digit
// (?=.*[\W_]) → at least one special character (!@#$%^&*, etc.)
// .{8,} → minimum 8 characters

//Email validation regex
// ^[^\s@]+ → at least one character that’s not a space or @ (local part)
// @ → must include an @ symbol
// [^\s@]+ → domain name (no spaces or @)
// \. → dot before the domain extension
// [^\s@]+$ → top-level domain (e.g., .com, .org)

export function validateEmailAndPassword(email, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);
  const validation = { email: null, password: null };

  if (!isEmailValid) {
    validation.email = "Invalid email. Enter valid email";
  }
  if (!isPasswordValid) {
    validation.password =
      "Invalid password. Password must be at least 8 characters long and include uppercase, lowercase, and a special character.";
  }

  return validation;
}

export function validateName(name) {
  // Name should not be empty or only contain whitespaces
  const nameRegex = /^\s*$/;
  return !nameRegex.test(name);
}
