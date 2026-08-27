import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

export default function LoginOtpModal({ isOpen, onClose }) {
  const [step, setStep] = useState("mobile"); // mobile | otp
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const REFERENCE_WEBSITE = import.meta.env.VITE_REFERENCE_WEBSITE;

  // Initialize OTP refs
  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
  }, []);

  // Focus first OTP input when step changes to otp
  useEffect(() => {
    if (step === "otp" && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [step]);

  if (!isOpen) return null;

  // ✅ SEND OTP API
  const sendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      toast.error("Enter valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/auth/send-otp-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
          referenceWebsite: REFERENCE_WEBSITE,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to send OTP");
        return;
      }

      setStep("otp");
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error("Something went wrong while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP + LOGIN API
  const verifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/auth/verify-otp-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
          otp: enteredOtp,
          referenceWebsite: REFERENCE_WEBSITE,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Invalid OTP");
        return;
      }

      // ✅ SAVE TOKEN (same as normal login)
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userData", JSON.stringify(data.userData));

      // optional: agar refreshToken use hota ho
      localStorage.setItem("refreshToken", data.refreshToken);

      // ✅ RESET STATE
      setStep("mobile");
      setMobile("");
      setOtp(Array(6).fill(""));

      onClose();

      // ✅ SAME FLOW AS NORMAL LOGIN
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong while verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle OTP input change
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  // ✅ Handle OTP paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    if (!/^\d{6}$/.test(pastedData)) {
      toast.error("Please paste exactly 6 digits");
      return;
    }

    const otpDigits = pastedData.split('');
    const newOtp = [...otp];
    
    otpDigits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus last input after paste
    if (otpRefs.current[5]) {
      otpRefs.current[5].focus();
    }
    
    toast.success("OTP pasted successfully!");
  };

  // ✅ Handle OTP backspace
  const handleOtpBackspace = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current is empty, focus previous and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        otpRefs.current[index - 1].focus();
      } else if (otp[index]) {
        // If current has value, clear it but stay focused
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // ✅ Handle OTP key down for arrow navigation
  const handleOtpKeyDown = (e, index) => {
    // Arrow left
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      otpRefs.current[index - 1].focus();
    }
    // Arrow right
    else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      otpRefs.current[index + 1].focus();
    }
  };

  // ✅ Handle mobile input enter key
  const handleMobileKeyDown = (e) => {
    if (e.key === "Enter") {
      sendOtp();
    }
  };

  // ✅ Handle OTP input enter key
  const handleOtpEnterKey = (e) => {
    if (e.key === "Enter") {
      verifyOtp();
    }
  };

  return (
    <>
      {/* Toast Container */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 2000,
            iconTheme: {
              primary: '#cba146',
              secondary: '#fff',
            },
          },
          error: {
            duration: 3000,
          },
        }}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white w-full max-w-sm rounded-xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 text-xl hover:text-gray-700"
          >
            ✕
          </button>

          <h2 className="text-xl font-semibold text-center mb-6">
            Login with OTP
          </h2>

          {step === "mobile" && (
            <>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter mobile number"
                value={mobile}
                maxLength={10}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/[^0-9]/g, ""))
                }
                onKeyDown={handleMobileKeyDown}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#cba146] focus:border-transparent"
              />

              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full bg-[#cba146] text-white py-3 rounded-lg font-medium hover:bg-[#b8913e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          )}

          {step === "otp" && (
            <>
              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, index)
                    }
                    onKeyDown={(e) => {
                      handleOtpBackspace(e, index);
                      handleOtpKeyDown(e, index);
                      if (index === 5) handleOtpEnterKey(e);
                    }}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#cba146] focus:border-transparent"
                  />
                ))}
              </div>

              <p className="text-sm text-gray-500 text-center mb-4">
                Enter the 6-digit OTP sent to {mobile}
              </p>

              <button
                onClick={verifyOtp}
                disabled={loading}
                className="w-full bg-[#cba146] text-white py-3 rounded-lg font-medium hover:bg-[#b8913e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <p className="text-sm text-center mt-4">
                Didn't receive OTP?{" "}
                <span
                  onClick={() => {
                    if (!loading) {
                      sendOtp();
                      toast.success("OTP resent successfully!");
                    }
                  }}
                  className="text-[#cba146] font-medium cursor-pointer hover:underline"
                >
                  Resend OTP
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}