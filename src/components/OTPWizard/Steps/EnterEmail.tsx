import { useMemo, useState } from "react";

type Props = {
  initialEmail?: string;
  onEmailSubmit: (email: string) => void;
  isOTPRequestLoading?: boolean;
};

export default function EnterEmail({
  initialEmail,
  onEmailSubmit,
  isOTPRequestLoading,
}: Props) {
  const [email, setEmail] = useState(initialEmail ?? "");

  console.log({ isOTPRequestLoading });

  const isSubmitDisabled = isOTPRequestLoading || email.length < 1;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onEmailSubmit(email);
      }}
    >
      <h1>Enter your email</h1>
      <hr />
      <p className="description">
        Please enter your email address. An OTP will be sent to this address.
      </p>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        autoFocus
      />
      <button type="submit" disabled={isSubmitDisabled}>
        {isOTPRequestLoading ? "Sending OTP..." : "Send OTP"}
      </button>
    </form>
  );
}
