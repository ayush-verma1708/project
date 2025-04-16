import React from "react";
import "../../css/Policy.css"

const ShippingPolicy: React.FC = () => {
  return (
    <div className="policy-container">
      <h1>Shipping Policy</h1>
      <p>
        <strong>Effective Date:</strong> 21/01/2025
      </p>

      <h2>1. Order Processing</h2>
      <p>
        Orders placed on Mobiiwrap are typically processed within 1-2 business
        days. Once your order is processed, you will receive a confirmation
        email with your order details.
      </p>

      <h2>2. Shipping Rates and Delivery Times</h2>
      <p>We offer the following shipping options:</p>
      <ul>
        <li>
          <strong>Standard Shipping:</strong> Estimated delivery within 5-7
          business days.
        </li>
        <li>
          <strong>Expedited Shipping:</strong> Estimated delivery within 2-3
          business days.
        </li>
        <li>
          <strong>International Shipping:</strong> Delivery times vary by
          destination. Please allow 7-14 business days for international orders.
        </li>
      </ul>
      <p>
        Shipping rates are calculated at checkout based on your location and the
        selected shipping method.
      </p>

      <h2>3. Order Tracking</h2>
      <p>
        Once your order has shipped, you will receive a shipping confirmation
        email containing a tracking number. You can track the status of your
        shipment on our website or directly through the carrier's website using
        the provided tracking number.
      </p>

      <h2>4. Shipping Destinations</h2>
      <p>
        We ship to most countries worldwide. However, please note that shipping
        times may vary depending on your location. International customers are
        responsible for any customs duties, taxes, or fees imposed by their
        country's customs regulations.
      </p>

      <h2>5. Shipping Restrictions</h2>
      <p>
        Certain products may have shipping restrictions due to size, weight, or
        regulatory requirements. If your order is affected by these
        restrictions, we will notify you promptly and work to find a suitable
        solution.
      </p>

      <h2>6. Undeliverable Packages</h2>
      <p>
        If a package is returned to us as undeliverable due to incorrect address
        information provided by the customer or if the package is unclaimed, we
        will attempt to contact you to arrange reshipment. Additional shipping
        charges may apply for reshipment.
      </p>

      <h2>7. Holiday Shipping</h2>
      <p>
        During peak seasons and holidays, shipping times may be longer than
        usual due to high order volumes and carrier delays. We recommend placing
        your orders in advance to ensure timely delivery.
      </p>

      <h2>8. Lost or Damaged Shipments</h2>
      <p>
        In the rare event that your package is lost or damaged in transit,
        please contact our customer service team immediately. We will work with
        the carrier to resolve the issue and ensure a satisfactory resolution
        for you.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions or concerns about our shipping policy or need
        assistance with your order, please contact our customer service team at{" "}
        <a href="mailto:mobiiwrapshopify@gmail.com">mobiiwrapshopify@gmail.com</a>. We
        are here to help!
      </p>

   
    </div>
  );
};

export default ShippingPolicy;
