import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputField from "custom-fields/InputField";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { showToastError, showToastSuccess } from "utils/common";
import { checkEmail, checkStringRequired } from "utils/validate-field";
import * as yup from "yup";
import { login } from "../userSlice";

function Login(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const defaultValues = {
    email: "",
    password: "",
  };

  const schema = yup.object().shape({
    email: checkEmail(yup),
    password: checkStringRequired(yup),
  });

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await showToastSuccess(dispatch(login(data)));
      history.push("/messenger");
    } catch (error) {
      showToastError(error);
    }
  };

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
            fontSize="80px"
            fontWeight="800"
          >
            Welcome
          </Typography>
          <Typography variant="body1" fontSize="30px">
            Connect with friends and the word <br /> around you on Facebook
          </Typography>
        </Stack>

        <Stack flex={1} justifyContent="center" direction="column">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              justifyContent="space-between"
              height="320px"
              padding="20px"
              bgcolor="#fff"
              borderRadius="10px"
              boxShadow="0px 0px 16px -8px rgba(0, 0, 0, 0.68)"
            >
              <InputField
                name="email"
                control={control}
                className="loginInput"
              />

              <InputField name="password" control={control} type="password" />

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
                <Link
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    color: "#fff",
                  }}
                  to="/register"
                >
                  Create a New Account
                </Link>
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Login;
