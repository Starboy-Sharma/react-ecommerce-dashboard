import { useMutation } from '@tanstack/react-query';
import { createContext, useState, type ReactNode } from 'react';
import { loginAdmin } from '../services/authService';
import type { AdminUserType, LoginResult } from '../types/admin';
import type { ApiResponseFailure, ApiResponseSuccess } from '../types/api';

interface AuthContextType {
  user: AdminUserType | null;
  login: (
    email: string,
    password: string
  ) => Promise<ApiResponseSuccess<LoginResult>>;
  logout: () => void;
}

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<AdminUserType | null>(null);

  const mutation = useMutation<
    ApiResponseSuccess<LoginResult>,
    ApiResponseFailure, // Keep this as Error since you're throwing Error objects
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      const result = await loginAdmin(email, password);

      // At this point, we know the HTTP request was successful
      // But we need to check if the API response indicates success
      if (result.status === true && 'result' in result) {
        return result; // This is ApiResponseSuccess<LoginResult>
      } else {
        // This is ApiResponseFailure - convert it to a thrown error
        throw result;
      }
    },
    onSuccess: (data) => {
      console.log('User logged in', data);
      setUser(data.result.admin);
      localStorage.setItem('authToken', data.result.token);
    },
    onError: (error) => {
      console.log('Error in logged in', error);
    },
  });

  const login = async (
    email: string,
    password: string
  ): Promise<ApiResponseSuccess<LoginResult>> => {
    const response = await mutation.mutateAsync({ email, password });
    return response;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
