import { useEffect } from "react";

const Checkout = () => {
    useEffect(() => {
        // ✅ Load Cashfree SDK dynamically
        const script = document.createElement("script");
        script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
        script.async = true;
        script.onload = () => startCheckout(); 
        document.body.appendChild(script);
        function startCheckout() {
            const urlParams = new URLSearchParams(window.location.search);
            const paymentSessionId = urlParams.get("session_id");
            if (!paymentSessionId) {
                alert("Invalid session ID! Redirecting to home.");
                window.location.href = "/";
                return;
            }
            const cashfree = window.Cashfree({
                mode: "production",
            });
            const checkoutOptions = {
                paymentSessionId: paymentSessionId,
                redirectTarget: "_self",
            };
            console.log("Starting Cashfree Checkout with Session ID:", paymentSessionId);

            cashfree.checkout(checkoutOptions);
        }
    }, []);

    return (
        <div>
            <h2>Redirecting to Payment...</h2>
            <p>Please wait while we process your payment.</p>
        </div>
    );
};

export default Checkout;