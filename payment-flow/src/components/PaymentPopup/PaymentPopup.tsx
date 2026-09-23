import { useState } from "react";
import {
  CreditCard,
  Lock,
  Smartphone,
  X,
} from "lucide-react";
import "./PaymentPopup.css";

interface PaymentPopupProps {
  onClose: () => void;
  onPay: (result: "success" | "failure") => void;
}

type PaymentMethod = "card" | "upi";

function PaymentPopup({
  onClose,
  onPay,
}: PaymentPopupProps) {
  const [method, setMethod] =
    useState<PaymentMethod>("card");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] =
    useState("");

  const [upiId, setUpiId] =
    useState("");

  const [error, setError] =
    useState("");

  const handleCardNumber = (
    value: string
  ) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 16);

    const formatted = numbers
      .replace(/(.{4})/g, "$1 ")
      .trim();

    setCardNumber(formatted);
    setError("");
  };

  const handleExpiry = (
    value: string
  ) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 4);

    if (numbers.length >= 3) {
      setExpiry(
        `${numbers.slice(0, 2)}/${numbers.slice(2)}`
      );
    } else {
      setExpiry(numbers);
    }

    setError("");
  };

  const handlePay = () => {
    if (method === "card") {
      const cleanCard =
        cardNumber.replace(/\s/g, "");

      /* CARD NUMBER VALIDATION */

      if (cleanCard.length !== 16) {
        setError(
          "Please enter a valid 16-digit card number."
        );
        return;
      }

      /* EXPIRY VALIDATION */

      if (expiry.length !== 5) {
        setError(
          "Please enter a valid expiry date."
        );
        return;
      }

      /* CVV VALIDATION */

      if (cvv.length !== 3) {
        setError(
          "Please enter a valid 3-digit CVV."
        );
        return;
      }

      /* ================================
         TEST PAYMENT CARDS
      ================================= */

      if (
        cleanCard === "1234567890123456"
      ) {
        setError("");

        onPay("success");

        return;
      }

      if (
        cleanCard === "0000000000000000"
      ) {
        setError("");

        onPay("failure");

        return;
      }

      /* OTHER CARD NUMBERS */

      setError(
        "Use one of the test card numbers shown below."
      );

      return;
    }

    /* ================================
       UPI PAYMENT
    ================================= */

    if (method === "upi") {
      if (!upiId.includes("@")) {
        setError(
          "Please enter a valid UPI ID."
        );
        return;
      }

      setError("");

      onPay("success");
    }
  };

  return (
    <div className="payment-overlay">

      <div className="payment-modal">

        {/* =========================
            HEADER
        ========================== */}

        <div className="modal-header">

          <div>

            <span className="modal-label">
              SECURE PAYMENT
            </span>

            <h2>
              Choose Payment Method
            </h2>

            <p>
              Complete your payment securely.
            </p>

          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close payment"
          >
            <X size={20} />
          </button>

        </div>

        {/* =========================
            PAYMENT METHODS
        ========================== */}

        <div className="payment-methods">

          <button
            type="button"
            className={`method-button ${
              method === "card"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setMethod("card");
              setError("");
            }}
          >
            <CreditCard size={20} />

            <span>
              Card
            </span>
          </button>

          <button
            type="button"
            className={`method-button ${
              method === "upi"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setMethod("upi");
              setError("");
            }}
          >
            <Smartphone size={20} />

            <span>
              UPI
            </span>
          </button>

        </div>

        {/* =========================
            CARD FORM
        ========================== */}

        {method === "card" && (
          <div className="payment-form">

            <div className="input-group">

              <label>
                Card Number
              </label>

              <input
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) =>
                  handleCardNumber(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-row">

              <div className="input-group">

                <label>
                  Expiry Date
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={expiry}
                  onChange={(e) =>
                    handleExpiry(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="input-group">

                <label>
                  CVV
                </label>

                <input
                  type="password"
                  inputMode="numeric"
                  placeholder="•••"
                  maxLength={3}
                  value={cvv}
                  onChange={(e) =>
                    setCvv(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 3)
                    )
                  }
                />

              </div>

            </div>

          

           

          </div>
        )}

        {/* =========================
            UPI FORM
        ========================== */}

        {method === "upi" && (
          <div className="payment-form">

            <div className="input-group">

              <label>
                UPI ID
              </label>

              <input
                type="text"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => {
                  setUpiId(e.target.value);
                  setError("");
                }}
              />

            </div>

            <div className="upi-info">

              <Smartphone size={18} />

              <span>
                Enter your UPI ID to continue
                securely.
              </span>

            </div>

          </div>
        )}

        {/* =========================
            ERROR
        ========================== */}

        {error && (
          <div className="payment-error">
            {error}
          </div>
        )}

        {/* =========================
            PAY BUTTON
        ========================== */}

        <button
          type="button"
          className="secure-pay-button"
          onClick={handlePay}
        >
          <Lock size={17} />

          <span>
            Pay Securely ₹2,949
          </span>
        </button>

        <p className="payment-note">
          Your payment details are encrypted
          and protected.
        </p>

      </div>

    </div>
  );
}

export default PaymentPopup;