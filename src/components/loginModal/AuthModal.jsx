// features/auth/AuthModal.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { closeAuthModal } from './authSlice';
// import LoginForm from './LoginForm'; // Your existing login component
import Login from "../../pages/Login"
const AuthModal = () => {
  const { authModalOpen, authMode } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!authModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <Login
          isLogin={authMode === 'login'} 
          onSuccess={() => dispatch(closeAuthModal())}
        />
      </div>
    </div>
  );
};

export default AuthModal;