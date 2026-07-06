import users from "../mocks/users.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const loginUser = async ({ email, password }) => {
  await delay(800);

  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const { password: _password, ...safeUser } = user;

  const token = `mock-token-${safeUser.id}-${Date.now()}`;

  return {
    user: safeUser,
    token,
  };
};

export const logoutUser = async () => {
  await delay(300);
  return true;
};

export const forgotPassword = async (email) => {
  await delay(600);

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    throw new Error("No account found with that email address.");
  }

  return {
    success: true,
    message: "Password reset link sent successfully.",
  };
};

export const resetPassword = async ({ token, password }) => {
  await delay(600);

  if (!token) {
    throw new Error("Invalid reset token.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  return {
    success: true,
    message: "Password reset successfully.",
  };
};