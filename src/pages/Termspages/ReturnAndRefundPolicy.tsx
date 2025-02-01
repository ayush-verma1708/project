import React from "react";
import "./Policy.css";

const ReturnAndRefundPolicy: React.FC = () => {
  return (
    <div className="policy-container">
      <h1>Return and Refund Policy</h1>
      <p>
        <strong>Effective Date:</strong> 21/01/2025
      </p>

      <h2>No Returns or Exchanges</h2>
      <p>
        At Mobiiwrap, we strive to ensure that our device skins meet the highest
        standards of quality. As a result, we do not accept returns or exchanges
        for any items purchased.
      </p>

      <h2>Defective Products</h2>
      <p>
        If you receive a defective device skin, please contact our customer
        service team immediately at{" "}
        <a href="mailto:mobiiwrapshopify@gmail.com">mobiiwrapshopify@gmail.com</a>. 
        We are committed to resolving such issues to your satisfaction. In the
        case of a defective product, we will provide you with a discount on your
        next purchase.
      </p>

      <h3>Discount on Next Purchase</h3>
      <p>To receive a discount on your next purchase due to a defective product, follow these steps:</p>
      <ol>
        <li>
          Contact our customer service team at{" "}
          <a href="mailto:mobiiwrapshopify@gmail.com">mobiiwrapshopify@gmail.com</a>{" "}
          to report the defect.
        </li>
        <li>Provide proof of purchase (order number or receipt) and details of the defect.</li>
        <li>
          Our team will assess the defect and issue a discount code for your
          next purchase if the defect is confirmed.
        </li>
      </ol>

      <h2>Non-Returnable Items</h2>
      <p>
        As our product line consists exclusively of device skins, these are not
        eligible for return or exchange.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about our policy, please reach out
        to our customer service team at{" "}
        <a href="mailto:mobiiwrapshopify@gmail.com">mobiiwrapshopify@gmail.com</a>. We
        are here to assist you and ensure your satisfaction with every purchase.
      </p>

    
    </div>
  );
};

export default ReturnAndRefundPolicy;
