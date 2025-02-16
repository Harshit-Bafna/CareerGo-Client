import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { forgetPassword, ResendVerifyEmailLink } from "../store/slices/authSlice";

export default function SentEmail() {
  const location = useLocation();
  const dispatch = useDispatch();

  const email = location.state.EmailAddress;
  const SentEmailMessage = location.state?.SentEmailMessage;
  const IsEmailVerify = location.state.IsEmailVerify;
  const IsForgotPassword = location.state.IsForgotPassword;

  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState(60);

  const handleClick = () => {
    if (IsEmailVerify) {
      const payload = { emailAddress: email };
      dispatch(ResendVerifyEmailLink(payload));
    } else if (IsForgotPassword) {
      const payload = { emailAddress: email };
      dispatch(forgetPassword(payload));
    }

    setIsDisabled(true);
    setTimer(60);
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mt-4">Check Your Email</h1>
        <p className="text-gray-600 mt-2">
          We have sent you an email. Please check your inbox and follow the instructions {SentEmailMessage}.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Didn’t receive the email? Check your spam folder or resend it below.
        </p>
        <button
          onClick={handleClick}
          disabled={isDisabled}
          className={`mt-4 mx-auto flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
            isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isDisabled ? `Resend in ${timer}s` : "Resend Email"}
        </button>
      </div>
    </div>
  );
}
