import React, { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import ZuaiLogo from "../images/zuaiLogo.avif";
import { baseURL } from "../util";
import { DataContext } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Component = styled(Box)`
  width: 90%; // Responsive width
  max-width: 400px; // Max width for larger screens
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
  padding: 20px; // Add some padding for better spacing
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;

const ImgLogo = styled("img")({
  width: "100%", // Responsive logo
  maxWidth: 100, // Limit the max size
  margin: "auto",
  display: "flex",
  marginBottom: 20, // Add some margin at the bottom
});

const Error = styled(Typography)`
  color: #ff6161;
  font-size: 10px;
  line-height: 0;
  margin-top: 10px;
  font-weight: bold;
`;

const sigupIntial = {
  name: "",
  username: "",
  password: "",
};
const loginInitialValues = {
  username: "",
  password: "",
};

function Login({ isUserAuthenticated }) {
  const [account, setAccount] = useState("login");
  const [signup, setSignup] = useState(sigupIntial);
  const [error, setError] = useState("");
  const [login, setLogin] = useState(loginInitialValues);

  const { setAccounts } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignupBtn = () => {
    account === "signup" ? setAccount("login") : setAccount("signup");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    try {
      let response = await axios.post(`${baseURL}/signup`, signup);
      console.log("responsedata==>", response);

      if (response && response.status === 200) {
        setError("");
        setSignup(sigupIntial);
        setAccount("login");
      } else {
        setError(
          response?.msg || "Something went wrong! Please try again later"
        );
      }
    } catch (error) {
      console.log("Error in Request:", error);
      if (error.response) {
        setError(
          `Error: ${error.response.data.message || "Please try again later"}`
        );
      } else {
        setError(
          "Network Error: Please check your connection or try again later."
        );
      }
    }
  };

  const loginUser = async () => {
    let response = await axios.post(`${baseURL}/login`, login);
    if (response.status === 200) {
      setError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccounts({
        username: response.data.username,
        name: response.data.name,
      });
      isUserAuthenticated(true);
      navigate("/");
    } else {
      setError("something went wrong! Please try again later");
    }
  };

  return (
    <Component>
      <Box>
        <ImgLogo src={ZuaiLogo} alt="logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              onChange={onValueChange}
              label="Enter Username"
              variant="standard"
              name="username"
              value={login.username}
            />
            <TextField
              label="Enter password"
              variant="standard"
              onChange={onValueChange}
              name="password"
              value={login.password}
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={loginUser}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>Or</Text>
            <SignupButton onClick={toggleSignupBtn}>
              Create an Account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              label="Enter Name"
              name="name"
              variant="standard"
              onChange={onInputChange}
              value={signup.name}
            />
            <TextField
              label="Enter Username"
              name="username"
              variant="standard"
              onChange={onInputChange}
              value={signup.username}
            />
            <TextField
              label="Enter-password"
              name="password"
              variant="standard"
              onChange={onInputChange}
              value={signup.password}
            />
            {error && <Error>{error}</Error>}
            <SignupButton onClick={signupUser}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>Or</Text>
            <LoginButton variant="contained" onClick={toggleSignupBtn}>
              Already have an Account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
}

export default Login;
