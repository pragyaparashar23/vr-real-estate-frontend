import React from "react";
import { AuthProvider } from "./auth-provider";
import { ProfileProvider } from "./profile-provider";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </AuthProvider>
  );
};

export default AppProviders;
