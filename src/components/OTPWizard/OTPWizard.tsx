import { useState } from "react";
import { useCountdownTimer } from "../../hooks/timer";
import EnterEmail from "./Steps/EnterEmail";
import EnterOTP from "./Steps/EnterOTP";
import "./OTPWizard.scss";
import { postOTPRequest } from "../../services/email";

export default function OTPWizard() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(0);
  const { startTimer, countdown } = useCountdownTimer(30);
  const [loadingOTPRequest, setLoadingOTPRequest] = useState(false);

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
      {step === 0 && (
        <EnterEmail
          initialEmail={email}
          onEmailSubmit={handleEmailSubmit}
          isOTPRequestLoading={loadingOTPRequest}
        />
      )}
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
