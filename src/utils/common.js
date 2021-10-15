export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

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
