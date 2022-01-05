import { yupResolver } from "@hookform/resolvers/yup";
import { Box, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputField from "custom-fields/InputField";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { showToastError, showToastSuccess } from "utils/common";
import {
  checkConfirmPassword,
  checkEmail,
  checkPassWord,
  checkPhone,
  checkStringRequired,
} from "utils/validate-field";
import * as yup from "yup";
import { register } from "../userSlice";

function Register(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.user.loading);

  const defaultValues = {
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const schema = yup.object().shape({
    username: checkStringRequired(yup),
    email: checkEmail(yup),
    phone: checkPhone(yup),
    password: checkPassWord(yup),
    confirmPassword: checkConfirmPassword(yup),
  });

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...other } = data;
    try {
      await showToastSuccess(dispatch(register(other)));
      history.push("/login");
    } catch (error) {
      console.log(error);
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
              height="560px"
              padding="20px"
              bgcolor="#fff"
              borderRadius="10px"
              boxShadow="0px 0px 16px -8px rgba(0, 0, 0, 0.68)"
            >
              <InputField name="username" control={control} />

              <InputField name="email" control={control} />

              <InputField name="phone" control={control} />

              <InputField name="password" control={control} type="password" />

              <InputField
                name="confirmPassword"
                control={control}
                type="password"
              />

              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  height: "50px",
                  borderRadius: "10px",
                  backgroundColor: loading
                    ? "#62a1f3 !important"
                    : "#1775ee !important",
                }}
              >
                <Box sx={{ color: "white" }}>Register</Box>

                {loading && (
                  <Box
                    sx={{
                      position: "absolute",
                      width: "20%",
                      top: "18px",
                      ml: 8,
                    }}
                  >
                    <CircularProgress
                      sx={{ position: "absolute", color: "white" }}
                      size={14}
                    />
                  </Box>
                )}
              </Button>

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
                  to="/login"
                >
                  Log Into Account
                </Link>
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Register;
