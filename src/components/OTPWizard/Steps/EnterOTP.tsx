import { useMemo, useState } from "react";

type Props = {
  initialOtp?: string;
  onOTPSubmit: (otp: string) => void;
  onResendOTPRequest: () => void;
  timerValue?: number;
};

export default function EnterOTP({
  initialOtp,
  onOTPSubmit,
  onResendOTPRequest,
  timerValue,
}: Props) {
  const [otp, setOtp] = useState(initialOtp ?? "");

  const isSubmitDisabled = useMemo(() => {
    return otp.length < 1;
  }, [otp]);

  const isTimerRunning = timerValue !== undefined && timerValue > 0;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onOTPSubmit(otp);
      }}
    >
      <h1>Enter the OTP</h1>
      <hr />
      <p className="description">
        Please enter the OTP sent to your email address.
      </p>
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(event) => {
          setOtp(event.target.value);
        }}
        autoFocus
      />
      <button
        type="submit"
        disabled={isTimerRunning}
        onClick={onResendOTPRequest}
      >
        Resend OTP {isTimerRunning && `(Wait ${timerValue} sec)`}
      </button>
      <button type="submit" disabled={isSubmitDisabled}>
        Continue
      </button>
    </form>
  );
}
