import { useState } from "react";
import { useCountdownTimer } from "../../hooks/timer";
import { postOTPRequest } from "../../services/email";
import "./OTPWizard.scss";
import EnterEmail from "./Steps/EnterEmail";
import EnterOTP from "./Steps/EnterOTP";

export default function OTPWizard() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(0);
  const [loadingOTPRequest, setLoadingOTPRequest] = useState(false);
  const { startTimer, countdown } = useCountdownTimer(30);

  const sendOTPToEmail = async (email: string) => {
    setLoadingOTPRequest(true);
    try {
      await postOTPRequest(email);
    } catch (error) {
      window.alert(`An error occurred while sending the OTP.`);
      return;
    } finally {
      setLoadingOTPRequest(false);
    }
    startTimer();
  };

  const handleEmailSubmit = async (newEmail: string) => {
    if (email !== newEmail) {
      setEmail(newEmail);
      await sendOTPToEmail(newEmail);
    }
    setStep(1);
  };

  const handleResendRequest = () => {
    sendOTPToEmail(email);
  };

  return (
    <div className="OTPWizard">
      {/* Displaying back only if the current step is not zero */}
      {step > 0 && (
        <button
          className="back-btn"
          onClick={() => {
            setStep(step - 1);
          }}
        >
          Back
        </button>
      )}
      {/* Step 1: Enter email */}
      {step === 0 && (
        <EnterEmail
          initialEmail={email}
          onEmailSubmit={handleEmailSubmit}
          isOTPRequestLoading={loadingOTPRequest}
        />
      )}
      {/* Step 2: Enter OTP  */}
      {step === 1 && (
        <EnterOTP
          initialOtp={otp}
          onOTPSubmit={setOtp}
          onResendOTPRequest={handleResendRequest}
          timerValue={countdown}
        />
      )}
    </div>
  );
}
