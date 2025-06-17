import { createContext, type ReactNode } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser, loginAdmin } from '../services/authService';
import type { AdminUserType, LoginResult } from '../types/admin';
import type { ApiResponseFailure, ApiResponseSuccess } from '../types/api';

interface AuthContextType {
  user: AdminUserType | null;
  login: (
    email: string,
    password: string
  ) => Promise<ApiResponseSuccess<LoginResult>>;
  logout: () => void;
  isLoading: boolean;
  isInitializing: boolean;
  isError: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const {
    data: userData,
    isLoading: isInitializing,
    isError,
  } = useQuery({
    queryKey: ['auth-check'],
    queryFn: async (): Promise<LoginResult | null> => {
      const token = localStorage.getItem('authToken');
      if (!token) return null;

      try {
        const response = await getUser();
        if (response.status && 'result' in response) {
          return response.result;
        }
        return null;
      } catch {
        localStorage.removeItem('authToken');
        return null;
      }
    },
    staleTime: 60_000,
    retry: false,
  });

  const user = userData?.admin ?? null;

  const mutation = useMutation<
    ApiResponseSuccess<LoginResult>,
    ApiResponseFailure,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      const result = await loginAdmin(email, password);
      if (result.status && 'result' in result) return result;
      throw result;
    },
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.result.token);
      queryClient.invalidateQueries({ queryKey: ['auth-check'] });
    },
  });

  const login = async (email: string, password: string) => {
    return await mutation.mutateAsync({ email, password });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    queryClient.invalidateQueries({ queryKey: ['auth-check'] });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading: mutation.isPending,
        isInitializing,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
