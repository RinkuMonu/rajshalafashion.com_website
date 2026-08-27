import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentStatus = () => {
    const [status, setStatus] = useState("Checking...");
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");

    useEffect(() => {
        if (!orderId) {
            setStatus("Invalid Order ID");
            return;
        }

        fetch(`https://api.worldpayme.com/check-payment-status?order_id=${orderId}`)
            .then(res => res.json())
            .then(data => setStatus(data.status))
            .catch(() => setStatus("Error fetching status"));
    }, [orderId]);

    return (
        <div>
            <h2>Payment Status: {status}</h2>
        </div>
    );
};

export default PaymentStatus;