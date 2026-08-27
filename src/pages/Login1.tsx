import React, { useState, useEffect } from "react";
import {
  Lock,
  User,
  Phone,
  Mail,
  Eye,
  EyeOff,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Login1() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
  const [ setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetErrors, setResetErrors] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const navigate = useNavigate();
    const location = useLocation();
console.log(location.state,"loca")
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      setResetToken(token);
      setShowResetPassword(true);
      setIsLogin(false);
      setShowForgotPassword(false);
    }
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateName = (name) => {
    const re = /^[A-Za-z]+$/;
    return re.test(name);
  };

  const validateMobile = (mobile) => {
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      hasMinLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    };

    if (!isLogin) {
      if (!firstName.trim()) {
        newErrors.firstName = "First name is required";
        valid = false;
      } else if (!validateName(firstName)) {
        newErrors.firstName = "First name should contain only alphabets";
        valid = false;
      }

      if (!lastName.trim()) {
        newErrors.lastName = "Last name is required";
        valid = false;
      } else if (!validateName(lastName)) {
        newErrors.lastName = "Last name should contain only alphabets";
        valid = false;
      }

      if (mobile && !validateMobile(mobile)) {
        newErrors.mobile = "Please enter a valid 10-digit mobile number";
        valid = false;
      }
    }

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must contain: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateResetPassword = () => {
    let valid = true;
    const newErrors = {
      newPassword: "",
      confirmNewPassword: "",
    };

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (!validatePassword(newPassword)) {
      newErrors.newPassword =
        "Password must contain: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char";
      valid = false;
    }

    if (!confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password";
      valid = false;
    } else if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords don't match";
      valid = false;
    }

    setResetErrors(newErrors);
    return valid;
  };

  const handleBlur = (field) => {
    const newErrors = { ...errors };

    switch (field) {
      case "firstName":
        if (!firstName.trim()) {
          newErrors.firstName = "First name is required";
        } else if (!validateName(firstName)) {
          newErrors.firstName = "First name should contain only alphabets";
        } else {
          newErrors.firstName = "";
        }
        break;
      case "lastName":
        if (!lastName.trim()) {
          newErrors.lastName = "Last name is required";
        } else if (!validateName(lastName)) {
          newErrors.lastName = "Last name should contain only alphabets";
        } else {
          newErrors.lastName = "";
        }
        break;
      case "email":
        if (!email) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          newErrors.email = "";
        }
        break;
      case "mobile":
        if (mobile && !validateMobile(mobile)) {
          newErrors.mobile = "Please enter a valid 10-digit mobile number";
        } else {
          newErrors.mobile = "";
        }
        break;
      case "password":
        if (!password) {
          newErrors.password = "Password is required";
        } else if (!validatePassword(password)) {
          newErrors.password =
            "Password must contain: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char";
        } else {
          newErrors.password = "";
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleResetPasswordBlur = (field) => {
    const newErrors = { ...resetErrors };

    switch (field) {
      case "newPassword":
        if (!newPassword) {
          newErrors.newPassword = "New password is required";
        } else if (!validatePassword(newPassword)) {
          newErrors.newPassword =
            "Password must contain: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char";
        } else {
          newErrors.newPassword = "";
        }
        break;
      case "confirmNewPassword":
        if (!confirmNewPassword) {
          newErrors.confirmNewPassword = "Please confirm your new password";
        } else if (newPassword !== confirmNewPassword) {
          newErrors.confirmNewPassword = "Passwords don't match";
        } else {
          newErrors.confirmNewPassword = "";
        }
        break;
    }

    setResetErrors(newErrors);
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   setIsLoading(true);

  //   try {
  //     const res = await axios.post(
  //       `${baseUrl}/auth/login`,
  //       {
  //         email,
  //         password,
  //         referenceWebsite,
  //       },
  //       { withCredentials: true }
  //     );

  //     const data = res.data;
  //     if (data && data.accessToken) {
  //       localStorage.setItem("userData", JSON.stringify(data.userData));
  //       localStorage.setItem("token", data.accessToken);
  //       Swal.fire("Login Successful", "", "success");
  //       navigate("/");
  //       window.location.reload();
  //     } else {
  //       Swal.fire("Login failed", data?.msg || "Invalid credentials", "error");
  //     }
  //   } catch (err) {
  //     Swal.fire(
  //       "Login failed",
  //       err.response?.data?.msg || "Something went wrong",
  //       "error"
  //     );
  //   }

  //   setIsLoading(false);
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${baseUrl}/auth/login`,
        {
          email,
          password,
          referenceWebsite,
        },
        { withCredentials: true }
      );

      const data = res.data;

      if (data && data.accessToken) {
        // ✅ Save login data
        localStorage.setItem("userData", JSON.stringify(data.userData));
        localStorage.setItem("token", data.accessToken);

        // ✅ Step 1: Check for guest cart
        const guestCart = JSON.parse(localStorage.getItem("addtocart") || "[]");

        if (guestCart.length > 0) {
          // ✅ Step 2: Send guest cart items to user's backend cart
          await Promise.all(
            guestCart.map((item) =>
              axios.post(
                `${baseUrl}/cart/add`,
                {
                  productId: item.id,
                  quantity: item.quantity,
                },
                {
                  headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                  },
                  withCredentials: true,
                }
              )
            )
          );

          // ✅ Step 3: Clear localStorage guest cart
          localStorage.removeItem("addtocart");
        }

        // ✅ Step 4: Notify + redirect
        Swal.fire("Login Successful", "", "success");
        // navigate("/");
        const intended = location.state;
        if(intended){
          navigate(intended.from)
     
        }else{
          navigate("/")
          
        }
        window.location.reload(); // Refresh to load Redux cart from server
      } else {
        Swal.fire("Login failed", data?.msg || "Invalid credentials", "error");
      }
    } catch (err) {
      Swal.fire(
        "Login failed",
        err.response?.data?.msg || "Something went wrong",
        "error"
      );
    }

    setIsLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${baseUrl}/auth/signUp`,
        {
          firstName,
          lastName,
          email,
          password,
          referenceWebsite,
          mobile,
          address: "",
          role: "user",
        },
        { withCredentials: true }
      );

      const data = res.data;
      if (data && data.accessToken) {
        Swal.fire("Registration Successful", "", "success");
        setIsLogin(true);
      } else {
        Swal.fire("Failed", data?.msg || "Something went wrong", "error");
      }
    } catch (err) {
      Swal.fire(
        "Registration failed",
        err.response?.data?.msg || "Something went wrong",
        "error"
      );
    }

    setIsLoading(false);
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();

    if (!forgotPasswordEmail) {
      Swal.fire("Error", "Please enter your email address", "error");
      return;
    }

    if (!validateEmail(forgotPasswordEmail)) {
      Swal.fire("Error", "Please enter a valid email address", "error");
      return;
    }

    setForgotPasswordLoading(true);

    try {
      const res = await axios.post(`${baseUrl}/auth/request-reset`, {
        email: forgotPasswordEmail,
        referenceWebsite,
      });

      Swal.fire({
        title: "Verification Email Sent",
        text: res?.data?.msg,
        icon: "success",
      });

      setShowForgotPassword(false);
      setShowResetPassword(true);
      setResetToken(res?.data?.resetToken);
      setForgotPasswordEmail("");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.msg || "Failed to send reset link",
        "error"
      );
    }

    setForgotPasswordLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validateResetPassword()) return;

    setResetPasswordLoading(true);

    try {
      const res = await axios.post(`${baseUrl}/auth/reset-password`, {
        resetToken,
        newPassword,
      });

      console.log("ress:", res);


      Swal.fire(
        "Password Reset Successful",
        "Your password has been updated successfully. You can now login with your new password.",
        "success"
      );

      setShowResetPassword(false);
      setIsLogin(true);
      setResetToken("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      Swal.fire(
        "Reset Failed",
        err.response?.data?.msg ||
          "Password reset failed. The link may have expired.",
        "error"
      );
    }

    setResetPasswordLoading(false);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
      <div
  className="w-full md:w-1/2 p-8 md:p-12 flex flex-col gap-2 relative overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: "url('/home/login-img.jpg')" }}
>
  {/* Black gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 z-0"></div>

  {/* Content */}
  <motion.div className="max-w-md relative z-10">
    <h2 className="text-4xl font-bold text-white mb-4">
      {isLogin ? "Welcome back!" : "Create your account"}
    </h2>
    <p className="text-gray-200 text-lg">
      {isLogin
        ? "Sign in to access your personalized dashboard."
        : "Join our community to unlock exclusive features."}
    </p>
  </motion.div>
</div>


        <div
          className="w-full md:w-1/2 p-6 md:p-10 lg:p-14 bg-white overflow-y-auto"
          style={{ height: "calc(100vh - 30px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AnimatePresence mode="wait">
              {showResetPassword ? (
                <motion.div
                  key="reset-password"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    Reset Password
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Please enter your new password.
                  </p>

                  <form onSubmit={handleResetPassword}>
                    <div className="mb-6">
                      <label className="text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-3.5 text-gray-400"
                          size={18}
                        />
                        <input
                          className={`w-full p-3 pl-10 pr-10 rounded-xl border ${
                            resetErrors.newPassword
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          onBlur={() => handleResetPasswordBlur("newPassword")}
                          placeholder="New password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <Eye size={20} />
                          ) : (
                            <EyeOff size={20} />
                          )}
                        </button>
                      </div>
                      {resetErrors.newPassword && (
                        <p className="text-red-500 text-xs mt-1">
                          {resetErrors.newPassword}
                        </p>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        Password must contain:
                        <ul className="list-disc pl-5">
                          <li
                            className={
                              newPassword.length >= 8 ? "text-green-500" : ""
                            }
                          >
                            At least 8 characters
                          </li>
                          <li
                            className={
                              /[A-Z]/.test(newPassword) ? "text-green-500" : ""
                            }
                          >
                            One uppercase letter
                          </li>
                          <li
                            className={
                              /[a-z]/.test(newPassword) ? "text-green-500" : ""
                            }
                          >
                            One lowercase letter
                          </li>
                          <li
                            className={
                              /[0-9]/.test(newPassword) ? "text-green-500" : ""
                            }
                          >
                            One number
                          </li>
                          <li
                            className={
                              /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
                                ? "text-green-500"
                                : ""
                            }
                          >
                            One special character
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-3.5 text-gray-400"
                          size={18}
                        />
                        <input
                          className={`w-full p-3 pl-10 pr-10 rounded-xl border ${
                            resetErrors.confirmNewPassword
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          type={showConfirmNewPassword ? "text" : "password"}
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          onBlur={() =>
                            handleResetPasswordBlur("confirmNewPassword")
                          }
                          placeholder="Confirm new password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          onClick={() =>
                            setShowConfirmNewPassword(!showConfirmNewPassword)
                          }
                        >
                          {showConfirmNewPassword ? (
                            <Eye size={20} />
                          ) : (
                            <EyeOff size={20} />
                          )}
                        </button>
                      </div>
                      {resetErrors.confirmNewPassword && (
                        <p className="text-red-500 text-xs mt-1">
                          {resetErrors.confirmNewPassword}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={
                        resetPasswordLoading ||
                        resetErrors.newPassword ||
                        resetErrors.confirmNewPassword
                      }
                      className={`w-full py-4 px-4 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center relative ${
                        resetPasswordLoading
                          ? "bg-indigo-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-900 to-purple-400 hover:shadow-xl"
                      }`}
                    >
                      {resetPasswordLoading ? "Resetting..." : "Reset Password"}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        setShowResetPassword(false);
                        setShowForgotPassword(true);
                      }}
                      className="text-[#cba146] font-medium hover:text-[#c79018] inline-flex items-center"
                    >
                      ← Back to Forgot Password
                    </button>
                  </div>
                </motion.div>
              ) : showForgotPassword ? (
                <motion.div
                  key="forgot-password"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    Reset Password
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Enter your email address to reset your password.
                  </p>

                  <form onSubmit={handleRequestReset}>
                    <div className="mb-6">
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-3.5 text-gray-400"
                          size={18}
                        />
                        <input
                          className="w-full p-3 pl-10 rounded-xl border border-gray-200"
                          type="email"
                          value={forgotPasswordEmail}
                          onChange={(e) =>
                            setForgotPasswordEmail(e.target.value)
                          }
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={forgotPasswordLoading}
                      className={`w-full py-4 px-4 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center relative ${
                        forgotPasswordLoading
                          ? "bg-indigo-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-900 to-purple-400 hover:shadow-xl"
                      }`}
                    >
                      {forgotPasswordLoading ? "Sending..." : "Submit"}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setShowForgotPassword(false)}
                      className="text-indigo-600 font-medium hover:text-indigo-800 inline-flex items-center"
                    >
                      ← Back to {isLogin ? "Sign In" : "Sign Up"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={isLogin ? "login" : "register"}
                  initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                >
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    {isLogin ? "Sign in to your account" : "Create new account"}
                  </h3>

                  <form
                    onSubmit={isLogin ? handleLogin : handleRegister}
                    className="space-y-6"
                  >
                    {!isLogin && (
                      <>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <div className="relative">
                            <User
                              className="absolute left-3 top-3.5 text-gray-400"
                              size={18}
                            />
                            <input
                              className={`w-full p-3 pl-10 rounded-xl border ${
                                errors.firstName
                                  ? "border-red-500"
                                  : "border-gray-200"
                              }`}
                              value={firstName}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || /^[A-Za-z]+$/.test(value)) {
                                  setFirstName(value);
                                  if (errors.firstName) {
                                    setErrors({ ...errors, firstName: "" });
                                  }
                                }
                              }}
                              onBlur={() => handleBlur("firstName")}
                              required
                            />
                          </div>
                          {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Last Name
                          </label>
                          <div className="relative">
                            <User
                              className="absolute left-3 top-3.5 text-gray-400"
                              size={18}
                            />
                            <input
                              className={`w-full p-3 pl-10 rounded-xl border ${
                                errors.lastName
                                  ? "border-red-500"
                                  : "border-gray-200"
                              }`}
                              value={lastName}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || /^[A-Za-z]+$/.test(value)) {
                                  setLastName(value);
                                  if (errors.lastName) {
                                    setErrors({ ...errors, lastName: "" });
                                  }
                                }
                              }}
                              onBlur={() => handleBlur("lastName")}
                              required
                            />
                          </div>
                          {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-3.5 text-gray-400"
                          size={18}
                        />
                        <input
                          className={`w-full p-3 pl-10 rounded-xl border ${
                            errors.email ? "border-red-500" : "border-gray-200"
                          }`}
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) {
                              setErrors({ ...errors, email: "" });
                            }
                          }}
                          onBlur={() => handleBlur("email")}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {!isLogin && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Mobile
                        </label>
                        <div className="relative">
                          <Phone
                            className="absolute left-3 top-3.5 text-gray-400"
                            size={18}
                          />
                          <input
                            className={`w-full p-3 pl-10 rounded-xl border ${
                              errors.mobile
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            type="tel"
                            value={mobile}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || /^[0-9]*$/.test(value)) {
                                setMobile(value);
                                if (errors.mobile) {
                                  setErrors({ ...errors, mobile: "" });
                                }
                              }
                            }}
                            onBlur={() => handleBlur("mobile")}
                            placeholder="1234567890"
                            maxLength="10"
                          />
                        </div>
                        {errors.mobile && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-3.5 text-gray-400"
                          size={18}
                        />
                        <input
                          className={`w-full p-3 pl-10 pr-10 rounded-xl border ${
                            errors.password
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) {
                              setErrors({ ...errors, password: "" });
                            }
                          }}
                          onBlur={() => handleBlur("password")}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye size={20} />
                          ) : (
                            <EyeOff size={20} />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password}
                        </p>
                      )}
                      {!isLogin && (
                        <div className="text-xs text-gray-500 mt-1">
                          Password must contain:
                          <ul className="list-disc pl-5">
                            <li
                              className={
                                password.length >= 8 ? "text-green-500" : ""
                              }
                            >
                              At least 8 characters
                            </li>
                            <li
                              className={
                                /[A-Z]/.test(password) ? "text-green-500" : ""
                              }
                            >
                              One uppercase letter
                            </li>
                            <li
                              className={
                                /[a-z]/.test(password) ? "text-green-500" : ""
                              }
                            >
                              One lowercase letter
                            </li>
                            <li
                              className={
                                /[0-9]/.test(password) ? "text-green-500" : ""
                              }
                            >
                              One number
                            </li>
                            <li
                              className={
                                /[!@#$%^&*(),.?":{}|<>]/.test(password)
                                  ? "text-green-500"
                                  : ""
                              }
                            >
                              One special character
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {isLogin && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-sm text-[#cba146] hover:text-[#c28b13]"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={
                        isLoading ||
                        Object.values(errors).some((error) => error) ||
                        !email ||
                        !password ||
                        (!isLogin && (!firstName || !lastName))
                      }
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className={`w-full py-4 px-4 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center relative ${
                        isLoading
                          ? "bg-[#cba146] cursor-not-allowed"
                          : "bg-[#cba146] hover:shadow-xl"
                      }`}
                    >
                      {isLoading
                        ? "Processing..."
                        : isLogin
                        ? "Sign In"
                        : "Create Account"}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
                    >
                      {isLogin
                        ? "Don't have an account? Sign up"
                        : "Already have an account? Sign in"}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
