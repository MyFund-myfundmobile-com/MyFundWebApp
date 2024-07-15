import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

interface UserProfile {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  profile_picture?: string;
  preferred_asset: string;
  savings_goal_amount: number;
  time_period: number;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  const login = (token: string, userId: string) => {
    setIsAuthenticated(true);
    setUserToken(token);
    fetchUserProfile(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserToken(null);
    setUserProfile(null);
  };

  const fetchUserProfile = async (token: string) => {
    try {
      console.log("User profile fetched:", userProfile);
      const response = await axios.get<UserProfile>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user-profile/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      logout();
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchUserProfile(userToken);
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userProfile, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
