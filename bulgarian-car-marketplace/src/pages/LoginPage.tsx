// src/pages/LoginPage.tsx
// Login Page for Bulgarian Car Marketplace

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { bulgarianAuthService } from '../firebase';
import Header from '../components/Header';

// Styled Components
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main} 0%, ${({ theme }) => theme.colors.primary.dark} 100%);
`;

const LoginContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
`;

const LoginCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['4xl']};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  width: 100%;
  max-width: 450px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.secondary.main});
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  .logo {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary.main};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    display: block;
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  label {
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }

  input {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    border: 2px solid ${({ theme }) => theme.colors.grey[200]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    background: ${({ theme }) => theme.colors.background.paper};
    transition: all 0.3s ease-in-out;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }

  .error {
    color: ${({ theme }) => theme.colors.error.main};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
`;

const LoginButton = styled.button<{ loading?: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: ${({ theme }) => theme.spacing.lg};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.base};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
  color: ${({ theme }) => theme.colors.text.secondary};

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.grey[300]};
  }

  &::before {
    margin-right: ${({ theme }) => theme.spacing.lg};
  }

  &::after {
    margin-left: ${({ theme }) => theme.spacing.lg};
  }
`;

const SocialLoginButton = styled.button<{ provider: 'google' | 'facebook' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme, provider }) =>
    provider === 'google' ? '#4285f4' : '#1877f2'};
  background: ${({ theme, provider }) =>
    provider === 'google' ? '#4285f4' : '#1877f2'};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 100%;

  &:hover {
    background: ${({ theme, provider }) =>
      provider === 'google' ? '#3367d6' : '#166fe5'};
    transform: translateY(-1px);
  }

  .icon {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const Links = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  padding-top: ${({ theme }) => theme.spacing['2xl']};
  border-top: 1px solid ${({ theme }) => theme.colors.grey[200]};

  .link {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
      text-decoration: underline;
    }
  }

  .divider {
    margin: 0 ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

// Login Page Component
const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors = {
      email: '',
      password: '',
      general: ''
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = t('login.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('login.emailInvalid');
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t('login.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('login.passwordTooShort');
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setErrors({ email: '', password: '', general: '' });

      await bulgarianAuthService.signIn(formData.email, formData.password);

      // Redirect to home page
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);

      // Handle different error types
      if (error.code === 'auth/user-not-found') {
        setErrors(prev => ({ ...prev, general: t('login.userNotFound') }));
      } else if (error.code === 'auth/wrong-password') {
        setErrors(prev => ({ ...prev, general: t('login.wrongPassword') }));
      } else if (error.code === 'auth/too-many-requests') {
        setErrors(prev => ({ ...prev, general: t('login.tooManyRequests') }));
      } else {
        setErrors(prev => ({ ...prev, general: t('login.generalError') }));
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      setSocialLoading('google');
      setErrors({ email: '', password: '', general: '' });

      await bulgarianAuthService.signInWithGoogle();

      // Redirect to home page
      navigate('/');
    } catch (error: any) {
      console.error('Google login error:', error);
      setErrors(prev => ({ ...prev, general: t('login.googleLoginError') }));
    } finally {
      setSocialLoading(null);
    }
  };

  // Handle Facebook login
  const handleFacebookLogin = async () => {
    try {
      setSocialLoading('facebook');
      setErrors({ email: '', password: '', general: '' });

      await bulgarianAuthService.signInWithFacebook();

      // Redirect to home page
      navigate('/');
    } catch (error: any) {
      console.error('Facebook login error:', error);
      setErrors(prev => ({ ...prev, general: t('login.facebookLoginError') }));
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <LoginContainer>
      <Header />
      <LoginContent>
        <LoginCard>

          {/* Header */}
          <LoginHeader>
            <span className="logo">🚗 Globul Cars</span>
            <h1>{t('login.title')}</h1>
            <p>{t('login.subtitle')}</p>
          </LoginHeader>

        {/* Form */}
        <Form onSubmit={handleLogin}>
          {/* General Error */}
          {errors.general && (
            <div style={{
              padding: '12px',
              background: '#ffebee',
              border: '1px solid #f44336',
              borderRadius: '8px',
              color: '#c62828',
              fontSize: '14px',
              marginBottom: '16px'
            }}>
              {errors.general}
            </div>
          )}

          {/* Email */}
          <FormGroup>
            <label>{t('login.email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t('login.emailPlaceholder')}
              autoComplete="email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </FormGroup>

          {/* Password */}
          <FormGroup>
            <label>{t('login.password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={t('login.passwordPlaceholder')}
              autoComplete="current-password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </FormGroup>

          {/* Login Button */}
          <LoginButton type="submit" disabled={loading}>
            {loading ? t('login.signingIn') : t('login.signIn')}
          </LoginButton>
        </Form>

        {/* Divider */}
        <Divider>{t('login.or')}</Divider>

        {/* Social Login */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SocialLoginButton
            type="button"
            provider="google"
            onClick={handleGoogleLogin}
            disabled={socialLoading !== null}
          >
            <span className="icon">G</span>
            {socialLoading === 'google' ? t('login.signingIn') : t('login.continueWithGoogle')}
          </SocialLoginButton>

          <SocialLoginButton
            type="button"
            provider="facebook"
            onClick={handleFacebookLogin}
            disabled={socialLoading !== null}
          >
            <span className="icon">f</span>
            {socialLoading === 'facebook' ? t('login.signingIn') : t('login.continueWithFacebook')}
          </SocialLoginButton>
        </div>

        {/* Links */}
        <Links>
          <Link to="/forgot-password" className="link">
            {t('login.forgotPassword')}
          </Link>
          <span className="divider">•</span>
          <Link to="/register" className="link">
            {t('login.createAccount')}
          </Link>
        </Links>
      </LoginCard>
      </LoginContent>
    </LoginContainer>
  );
};

export default LoginPage;