import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputField from "custom-fields/InputField";
import React from "react";
import { useForm } from "react-hook-form";
import {
  checkConfirmPassword,
  checkEmail,
  checkStringRequired,
} from "utils/common";
import * as yup from "yup";

function Register(props) {
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const schema = yup.object().shape({
    username: checkStringRequired(yup),
    email: checkEmail(yup),
    password: checkStringRequired(yup),
    confirmPassword: checkConfirmPassword(yup),
  });

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      bgcolor="#f0f2f5"
    >
      <Stack direction="row" width="70%" height="70%">
        <Stack flex={1.3} justifyContent="center" direction="column">
          <Typography
            variant="h3"
            color="#1775ee"
            fontSize="50px"
            fontWeight="800"
          >
            Welcome
          </Typography>
          <Typography variant="body1" fontSize="24px">
            Connect with friends and the word around you on Facebook
          </Typography>
        </Stack>

        <Stack flex={1} justifyContent="center" direction="column">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              justifyContent="space-between"
              height="440px"
              padding="20px"
              bgcolor="#fff"
              borderRadius="10px"
              boxShadow="0px 0px 16px -8px rgba(0, 0, 0, 0.68)"
            >
              <InputField name="username" control={control} />

              <InputField name="email" control={control} />

              <InputField name="password" control={control} type="password" />

              <InputField
                name="confirmPassword"
                control={control}
                type="password"
              />

              <Button
                variant="contained"
                type="submit"
                sx={{
                  height: "50px",
                  borderRadius: "10px",
                  backgroundColor: "#1775ee !important",
                }}
              >
                Login
              </Button>

              <Typography variant="body1" textAlign="center" color="#1775ee">
                Forgot Password?
              </Typography>

              <Button
                variant="contained"
                sx={{
                  alignSelf: "center",
                  width: "70%",
                  height: "50px",
                  borderRadius: "10px",
                  backgroundColor: "#42b72a !important",
                }}
              >
                Log Into Account
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Register;
