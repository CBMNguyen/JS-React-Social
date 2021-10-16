export const checkEmail = (yup) =>
  yup
    .string()
    .required("This field is required")
    .matches(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      "Please enter correct email!"
    );

export const checkStringRequired = (yup) =>
  yup.string().required("This field is required");

export const checkConfirmPassword = (yup) =>
  yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password"), null], "Passwords must match");

export const checkPassWord = (yup) =>
  yup
    .string()
    .required("This field is require.")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}?/,
      "Password must be at least 8 characters with one uppercase letter, one lowercase letter, and one special character"
    );
