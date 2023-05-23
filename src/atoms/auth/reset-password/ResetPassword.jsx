import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Input from '@molecules/input/Input';
import Button from '@molecules/button/Button';
import { authService } from '@services/api/auth/auth.service';
import backgroundImage from '@assets/images/background.jpg';
import '@atoms/auth/reset-password/ResetPassword.scss';

const ResetPassword = () => {
  // states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const [searchParams] = useSearchParams();

  const resetPassword = async (event) => {};
  return <div>Hello am ResetPassword!</div>;
};

export default ResetPassword;
