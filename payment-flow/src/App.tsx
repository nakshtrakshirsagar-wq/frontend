import { useState } from "react";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import PaymentPopup from "./components/PaymentPopup/PaymentPopup";
import PaymentStatus from "./components/PaymentStatus/PaymentStatus";

type PaymentState =
  | "order"
  | "payment"
  | "processing"
  | "success"
  | "failure";

function App() {
  const [paymentState, setPaymentState] =
    useState<PaymentState>("order");

  const handlePayNow = () => {
    setPaymentState("payment");
  };

  const handlePaymentStart = (
    result: "success" | "failure"
  ) => {
    setPaymentState("processing");

    setTimeout(() => {
      if (result === "success") {
        setPaymentState("success");
      } else {
        setPaymentState("failure");
      }
    }, 2500);
  };

  const handleClosePayment = () => {
    setPaymentState("order");
  };

  const handleTryAgain = () => {
    setPaymentState("payment");
  };

  const handleDone = () => {
    setPaymentState("order");
  };

  return (
    <>
      <PaymentPage onPayNow={handlePayNow} />

      {paymentState === "payment" && (
        <PaymentPopup
          onClose={handleClosePayment}
          onPay={handlePaymentStart}
        />
      )}

      {(paymentState === "processing" ||
        paymentState === "success" ||
        paymentState === "failure") && (
        <PaymentStatus
          status={paymentState}
          onTryAgain={handleTryAgain}
          onDone={handleDone}
        />
      )}
    </>
  );
}

export default App;