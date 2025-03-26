import { regexEmail, regexName } from "./regex";

const validate = (name, value, val2 = "") => {
  if (!value || !value.trim()) return `${name} is required`;
  switch (name) {
    case "name": {
      if (!regexName.test(value)) return "Name is not valid";
      return null;
    }
    case "email": {
      if (!regexEmail.test(value)) return "Enter a valid email";
      return null;
    }
    // case "empty": {
    //   if (!value.trim()) return ` value is required`;
    //   return null;
    // }
    case "confirmPassword": {
      if (val2 !== "" && value !== val2) return "Passwords did not match";
      return null;
    }
    default:
      return null;
  }
};
export default validate;

export const validateEmpty = (name, text) => {
  if (!name.trim()) return ` ${text} is required`;
  return null;
};
