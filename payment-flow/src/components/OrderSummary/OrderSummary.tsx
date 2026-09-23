import {
  CheckCircle2,
  ChevronRight,
  Package,
  ShieldCheck,
} from "lucide-react";
import "./OrderSummary.css";

interface OrderSummaryProps {
  onPayNow: () => void;
}

function OrderSummary({ onPayNow }: OrderSummaryProps) {
  const productPrice = 2499;
  const quantity = 1;
  const tax = 450;

  const subtotal = productPrice * quantity;
  const total = subtotal + tax;

  return (
    <section className="order-section">

      <div className="order-card">

        <div className="order-card-header">
          <div>
            <span className="section-label">
              ORDER SUMMARY
            </span>

            <h2>Review Your Order</h2>
          </div>

          <div className="order-icon">
            <Package size={22} />
          </div>
        </div>

        <div className="product-card">

          <div className="product-image">
            <Package size={30} />
          </div>

          <div className="product-details">
            <h3>Premium Bus Ticket</h3>

            <p>
              Zproo Go • Standard Seat
            </p>

            <span className="product-status">
              <CheckCircle2 size={14} />
              Confirmed
            </span>
          </div>

          <div className="product-price">
            <strong>₹2,499</strong>
            <span>Qty: {quantity}</span>
          </div>

        </div>

        <div className="price-details">

          <div className="price-row">
            <span>Subtotal</span>
            <strong>
              ₹{subtotal.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="price-row">
            <span>Taxes & Charges</span>
            <strong>
              ₹{tax.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="divider"></div>

          <div className="total-row">
            <span>Total Amount</span>

            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>
          </div>

        </div>

        <div className="secure-payment-info">
          <ShieldCheck size={18} />

          <div>
            <strong>Secure Payment</strong>

            <p>
              Your payment information is encrypted
              and securely processed.
            </p>
          </div>
        </div>

        <button
          className="pay-now-button"
          onClick={onPayNow}
        >
          <span>Pay ₹{total.toLocaleString("en-IN")}</span>

          <ChevronRight size={19} />
        </button>

      </div>

    </section>
  );
}

export default OrderSummary;