import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SignupData } from "../../types/auth.types";
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validateConfirmPassword,
} from "../../utils/validation";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Eye, EyeOff, UserPlus, Check, X } from "lucide-react";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasLength: false,
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
  });

  const handleInputChange =
    (field: keyof SignupData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Update password strength indicators
      if (field === "password") {
        setPasswordStrength({
          hasLength: value.length >= 6,
          hasLower: /(?=.*[a-z])/.test(value),
          hasUpper: /(?=.*[A-Z])/.test(value),
          hasNumber: /(?=.*\d)/.test(value),
        });
      }

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupData> = {};

    newErrors.name = validateRequired(formData.name, "Name");
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    newErrors.confirmPassword = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await signup(formData);
      navigate("/dashboard");
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  const PasswordStrengthIndicator = () => (
    <div className="mt-2 space-y-2">
      <div className="text-xs text-gray-600">Password must contain:</div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div
          className={`flex items-center ${
            passwordStrength.hasLength ? "text-green-600" : "text-gray-400"
          }`}>
          {passwordStrength.hasLength ? (
            <Check className="h-3 w-3 mr-1" />
          ) : (
            <X className="h-3 w-3 mr-1" />
          )}
          At least 6 characters
        </div>
        <div
          className={`flex items-center ${
            passwordStrength.hasLower ? "text-green-600" : "text-gray-400"
          }`}>
          {passwordStrength.hasLower ? (
            <Check className="h-3 w-3 mr-1" />
          ) : (
            <X className="h-3 w-3 mr-1" />
          )}
          Lowercase letter
        </div>
        <div
          className={`flex items-center ${
            passwordStrength.hasUpper ? "text-green-600" : "text-gray-400"
          }`}>
          {passwordStrength.hasUpper ? (
            <Check className="h-3 w-3 mr-1" />
          ) : (
            <X className="h-3 w-3 mr-1" />
          )}
          Uppercase letter
        </div>
        <div
          className={`flex items-center ${
            passwordStrength.hasNumber ? "text-green-600" : "text-gray-400"
          }`}>
          {passwordStrength.hasNumber ? (
            <Check className="h-3 w-3 mr-1" />
          ) : (
            <X className="h-3 w-3 mr-1" />
          )}
          Number
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <UserPlus className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange("name")}
              error={errors.name}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange("email")}
              error={errors.email}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange("password")}
                error={errors.password}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {formData.password && <PasswordStrengthIndicator />}
            </div>

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                error={errors.confirmPassword}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label
              htmlFor="agree-terms"
              className="ml-2 block text-sm text-gray-900">
              I agree to the{" "}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}>
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
