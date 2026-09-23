import {
  CheckCircle2,
  LoaderCircle,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import "./PaymentStatus.css";

interface PaymentStatusProps {
  status: "processing" | "success" | "failure";
  onTryAgain: () => void;
  onDone: () => void;
}

function PaymentStatus({
  status,
  onTryAgain,
  onDone,
}: PaymentStatusProps) {
  if (status === "processing") {
    return (
      <div className="status-overlay">
        <div className="status-card processing-card">

          <div className="processing-icon">
            <LoaderCircle size={42} />
          </div>

          <h2>Processing Payment</h2>

          <p>
            Please wait while we securely process
            your payment.
          </p>

          <div className="processing-bar">
            <span></span>
          </div>

          <small>
            Do not close or refresh this page.
          </small>

        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="status-overlay">
        <div className="status-card">

          <div className="success-icon">
            <CheckCircle2 size={48} />
          </div>

          <span className="status-label success-label">
            PAYMENT SUCCESSFUL
          </span>

          <h2>Payment Completed!</h2>

          <p>
            Your payment of ₹2,949 was completed
            successfully.
          </p>

          <div className="transaction-box">
            <span>Transaction ID</span>

            <strong>ZP202609221245</strong>
          </div>

          <button
            className="status-primary-button"
            onClick={onDone}
          >
            Done
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="status-overlay">
      <div className="status-card">

        <div className="failure-icon">
          <XCircle size={48} />
        </div>

        <span className="status-label failure-label">
          PAYMENT FAILED
        </span>

        <h2>Payment Could Not Be Completed</h2>

        <p>
          Something went wrong while processing
          your payment. Please try again.
        </p>

        <button
          className="status-primary-button"
          onClick={onTryAgain}
        >
          <RefreshCcw size={17} />
          Try Again
        </button>

        <button
          className="status-secondary-button"
          onClick={onDone}
        >
          Cancel
        </button>

      </div>
    </div>
  );
}

export default PaymentStatus;