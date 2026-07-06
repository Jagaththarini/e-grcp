import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import {
  loginUser,
  clearError,
} from "../../store/slices/authSlice";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
    isAuthenticated,
    user,
  } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    switch (user.role) {
      case "Admin":
        navigate("/dashboard", { replace: true });
        break;

      case "Risk Manager":
        navigate("/risks", { replace: true });
        break;

      case "Procurement Manager":
        navigate("/procurement", { replace: true });
        break;

      case "Auditor":
        navigate("/audits", { replace: true });
        break;

      case "Employee":
        navigate("/employee", { replace: true });
        break;

      default:
        navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0F766E 0%,#1D4ED8 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 480 }}>
        <Box textAlign="center" mb={3}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <LockOutlinedIcon
              sx={{
                color: "#0F766E",
                fontSize: 36,
              }}
            />
          </Box>

          <Typography
            variant="h4"
            fontWeight={700}
            color="white"
          >
            e-GRCP Portal
          </Typography>

          <Typography
            variant="body2"
            color="rgba(255,255,255,0.85)"
          >
            Enterprise Governance • Risk • Compliance • Procurement
          </Typography>
        </Box>

        <Card
          elevation={12}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
            >
              Welcome Back
            </Typography>

            <Typography
              color="text.secondary"
              mb={3}
            >
              Sign in to continue.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                fullWidth
                label="Email"
                autoComplete="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                display="flex"
                justifyContent="flex-end"
                mb={3}
              >
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  underline="hover"
                >
                  Forgot Password?
                </Link>
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      size={20}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="subtitle2"
              fontWeight={700}
              gutterBottom
            >
              Demo Login Credentials
            </Typography>

            <Typography variant="body2">
              <strong>Admin</strong><br />
              admin@egrcp.com / Admin@123
            </Typography>

            <Typography variant="body2" mt={1}>
              <strong>Risk Manager</strong><br />
              risk@egrcp.com / Risk@123
            </Typography>

            <Typography variant="body2" mt={1}>
              <strong>Procurement Manager</strong><br />
              procurement@egrcp.com / Procurement@123
            </Typography>

            <Typography variant="body2" mt={1}>
              <strong>Auditor</strong><br />
              auditor@egrcp.com / Audit@123
            </Typography>

            <Typography variant="body2" mt={1}>
              <strong>Employee</strong><br />
              employee@egrcp.com / Employee@123
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default LoginPage;