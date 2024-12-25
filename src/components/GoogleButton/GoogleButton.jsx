import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import axios from 'axios';
import css from './GoogleButton.module.css';

const GoogleButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const { data } = await axios.get('https://test-aquatrack-backend.onrender.com/auth/get-oauth-url');
      window.location.href = data.url; // Перенаправлення на сторінку Google OAuth
    } catch (error) {
      toast.error('Error getting Google OAuth URL');
    }
  };

  return (
    <button onClick={handleGoogleLogin} className={css.google_button}>
      <FcGoogle size={20} /> Continue with Google
    </button>
  );
};

export default GoogleButton;
