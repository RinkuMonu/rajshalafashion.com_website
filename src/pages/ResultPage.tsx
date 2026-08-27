import { useLocation } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

const ResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const status = queryParams.get('status'); // success / fail
  const txnId = queryParams.get('txnId');
  const amount = queryParams.get('amount');

  const isSuccess = status === 'Success';

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {isSuccess ? (
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        ) : (
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        )}
        <h2 className="text-2xl font-semibold mb-2">
          {isSuccess ? 'Payment Successful' : 'Payment Failed'}
        </h2>
        <p className="text-gray-600 mb-4">
          {isSuccess
            ? 'Your transaction was processed successfully.'
            : 'There was an issue processing your payment.'}
        </p>

        <div className="bg-gray-50 p-4 rounded-lg text-left text-sm font-mono text-gray-700 mb-4">
          <p><strong>Transaction ID:</strong> {txnId}</p>
          {amount && <p><strong>Amount:</strong> ₹{amount}</p>}
          <p><strong>Status:</strong> {status}</p>
        </div>

        <a
          href="/"
          className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default ResultPage;
