import { ShieldCheck } from "lucide-react";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import "./PaymentPage.css";

interface PaymentPageProps {
  onPayNow?: () => void;
}

function PaymentPage({ onPayNow }: PaymentPageProps) {
  const handlePayNow = () => {
    if (onPayNow) {
      onPayNow();
    }
  };

  return (
    <main className="payment-page">
      <div className="payment-container">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="payment-header">

          <div className="payment-badge">
            <span className="payment-badge-dot"></span>

            SECURE CHECKOUT
          </div>

          <h1>Complete Your Payment</h1>

          <p>
            Review your order details and complete
            your payment securely.
          </p>

        </header>

        {/* =================================================
            PAYMENT CONTENT
        ================================================= */}

        <div className="payment-content">

          <div className="payment-main">

            <OrderSummary
              onPayNow={handlePayNow}
            />

          </div>

          {/* =================================================
              SECURITY CARD
          ================================================= */}

          <aside className="payment-security-card">

            <div className="security-icon">
              <ShieldCheck size={23} />
            </div>

            <div className="security-content">

              <h3>Safe & Secure Payment</h3>

              <p>
                Your payment information is protected
                with secure encryption.
              </p>

            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}

export default PaymentPage;