import { MdAlternateEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

import './LoginPage.css';
import { useReducer, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/hooks/useAuth';
import { isApiError, type ApiResponseFailure } from '../../app/types/api';

interface LoginFormState {
  email: string;
  password: string;
}

interface LoginFormType {
  formData: LoginFormState;
  isError: boolean;
  errorMsg: string;
}

const loginFormInitialState: LoginFormType = {
  formData: {
    email: '',
    password: '',
  },
  errorMsg: '',
  isError: false,
};

type LoginFormActionType =
  | {
      type: 'SET_FIELD_VALUE';
      payload: { field: keyof LoginFormState; value: string };
    }
  | {
      type: 'SET_FIELD_ERROR';
      payload: { error: string };
    }
  | { type: 'RESET_FORM' };

function loginFormReducer(state: LoginFormType, action: LoginFormActionType) {
  switch (action.type) {
    case 'SET_FIELD_VALUE': {
      const key = action.payload.field;
      return {
        ...state,
        formData: {
          ...state.formData,
          [key]: action.payload.value,
        },
      };
    }

    case 'SET_FIELD_ERROR': {
      return {
        ...state,
        isError: true,
        errorMsg: action.payload.error,
      };
    }

    case 'RESET_FORM': {
      return { ...state, loginFormInitialState };
    }

    default: {
      return state;
    }
  }
}

export default function LoginPage() {
  const [loginForm, dispatch] = useReducer(
    loginFormReducer,
    loginFormInitialState
  );
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleFieldChange =
    (field: keyof LoginFormState) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      dispatch({
        type: 'SET_FIELD_VALUE',
        payload: {
          field,
          value,
        },
      });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login(
        loginForm.formData.email,
        loginForm.formData.password
      );

      console.log(response.result);

      navigate('/dashboard');
    } catch (error) {
      if (isApiError<ApiResponseFailure>(error)) {
        console.log('API Error:', error.status);

        dispatch({
          type: 'SET_FIELD_ERROR',
          payload: {
            error: error.error,
          },
        });
      } else {
        console.error('Unexpected error', error);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Howdy Admin!
            </h1>
          </div>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email:
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <MdAlternateEmail size={16} />
                </span>
                <input
                  type="email"
                  required
                  value={loginForm.formData.email}
                  onChange={handleFieldChange('email')}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password:
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <FaLock size={16} />
                </span>
                <input
                  type="password"
                  required
                  value={loginForm.formData.password}
                  onChange={handleFieldChange('password')}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <span className="text-red-700 text-center">
                {loginForm.isError && '*' + loginForm.errorMsg}
              </span>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md hover:from-blue-600 hover:to-indigo-700 transition hover:cusror-pointer"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
