// src/pages/RegisterPage.tsx
// Register Page for Bulgarian Car Marketplace

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { bulgarianAuthService } from '../firebase';
import Header from '../components/Header';

// Styled Components
const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.secondary.main} 0%, ${({ theme }) => theme.colors.secondary.dark} 100%);
`;

const RegisterContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
`;

const RegisterCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['3xl']};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  width: 100%;
  max-width: 450px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing['2xl']};
    max-width: 95%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.secondary.main}, ${({ theme }) => theme.colors.primary.main});
  }
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  .logo {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.secondary.main};
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  label {
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  input, select {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    border: 2px solid ${({ theme }) => theme.colors.grey[200]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    background: ${({ theme }) => theme.colors.background.paper};
    transition: all 0.3s ease-in-out;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.secondary.main};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.secondary.main}20;
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

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    accent-color: ${({ theme }) => theme.colors.secondary.main};
    flex-shrink: 0;
  }

  label {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.4;
    cursor: pointer;
    flex: 1;

    a {
      color: ${({ theme }) => theme.colors.secondary.main};
      text-decoration: none;
      font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .error {
    color: ${({ theme }) => theme.colors.error};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    margin-top: ${({ theme }) => theme.spacing.xs};
    display: block;
    width: 100%;
  }
`;

const RegisterButton = styled.button<{ loading?: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.secondary.main};
  color: ${({ theme }) => theme.colors.secondary.contrastText};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: ${({ theme }) => theme.spacing.lg};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary.dark};
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

const SocialRegisterButton = styled.button<{ provider: 'google' | 'facebook' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme, provider }) =>
    provider === 'google' ? '#4285f4' : '#1877f2'};
  background: ${({ theme, provider }) =>
    provider === 'google' ? '#4285f4' : '#1877f2'};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
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
    font-weight: bold;
  }
`;

const Links = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  padding-top: ${({ theme }) => theme.spacing['2xl']};
  border-top: 1px solid ${({ theme }) => theme.colors.grey[200]};

  .link {
    color: ${({ theme }) => theme.colors.secondary.main};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary.dark};
      text-decoration: underline;
    }
  }
`;

// Register Page Component
const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    city: '',
    region: '',
    preferredLanguage: 'bg',
    acceptTerms: false,
    acceptPrivacy: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));

    // Clear error when user changes checkbox
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('register.firstNameRequired');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('register.lastNameRequired');
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = t('register.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('register.emailInvalid');
    }

    // Phone validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = t('register.phoneRequired');
    } else if (!/^\+359\s?\d{2}\s?\d{3}\s?\d{3,4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = t('register.phoneInvalid');
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t('register.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('register.passwordTooShort');
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = t('register.passwordWeak');
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('register.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('register.passwordsNotMatch');
    }

    // Location validation
    if (!formData.city.trim()) {
      newErrors.city = t('register.cityRequired');
    }

    // Terms and privacy
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = t('register.acceptTermsRequired');
    }

    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = t('register.acceptPrivacyRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const displayName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

      await bulgarianAuthService.signUp(
        formData.email,
        formData.password,
        {
          displayName,
          phoneNumber: formData.phoneNumber,
          location: {
            city: formData.city,
            region: formData.region,
            postalCode: ''
          },
          preferredLanguage: formData.preferredLanguage as 'bg' | 'en'
        }
      );

      // Redirect to home page or verification page
      navigate('/');
    } catch (error: any) {
      console.error('Registration error:', error);

      // Handle different error types
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: t('register.emailAlreadyInUse') });
      } else if (error.code === 'auth/weak-password') {
        setErrors({ password: t('register.passwordWeak') });
      } else {
        setErrors({ general: t('register.generalError') });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google registration
  const handleGoogleRegister = async () => {
    try {
      setSocialLoading('google');
      setErrors({});

      await bulgarianAuthService.signInWithGoogle();

      // Redirect to home page
      navigate('/');
    } catch (error: any) {
      console.error('Google registration error:', error);
      setErrors({ general: t('register.googleRegisterError') });
    } finally {
      setSocialLoading(null);
    }
  };

  // Handle Facebook registration
  const handleFacebookRegister = async () => {
    try {
      setSocialLoading('facebook');
      setErrors({});

      await bulgarianAuthService.signInWithFacebook();

      // Redirect to home page
      navigate('/');
    } catch (error: any) {
      console.error('Facebook registration error:', error);
      setErrors({ general: t('register.facebookRegisterError') });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <RegisterContainer>
      <Header />
      <RegisterContent>
        <RegisterCard>

          {/* Header */}
          <RegisterHeader>
            <span className="logo">🚗 Globul Cars</span>
            <h1>{t('register.title')}</h1>
            <p>{t('register.subtitle')}</p>
          </RegisterHeader>

        {/* Form */}
        <Form onSubmit={handleRegister}>
          {/* General Error */}
          {errors.general && (
            <div style={{
              padding: '12px',
              background: '#ffebee',
              border: '1px solid #f44336',
              borderRadius: '8px',
              color: '#c62828',
              fontSize: '14px',
              marginBottom: '16px',
              gridColumn: '1 / -1'
            }}>
              {errors.general}
            </div>
          )}

          {/* Name Fields */}
          <FormGrid>
            <FormGroup>
              <label>{t('register.firstName')}</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder={t('register.firstNamePlaceholder')}
                autoComplete="given-name"
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </FormGroup>

            <FormGroup>
              <label>{t('register.lastName')}</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder={t('register.lastNamePlaceholder')}
                autoComplete="family-name"
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </FormGroup>
          </FormGrid>

          {/* Contact Fields */}
          <FormGrid>
            <FormGroup>
              <label>{t('register.email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('register.emailPlaceholder')}
                autoComplete="email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </FormGroup>

            <FormGroup>
              <label>{t('register.phoneNumber')}</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+359 88 123 4567"
                autoComplete="tel"
              />
              {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
            </FormGroup>
          </FormGrid>

          {/* Password Fields */}
          <FormGrid>
            <FormGroup>
              <label>{t('register.password')}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t('register.passwordPlaceholder')}
                autoComplete="new-password"
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </FormGroup>

            <FormGroup>
              <label>{t('register.confirmPassword')}</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={t('register.confirmPasswordPlaceholder')}
                autoComplete="new-password"
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </FormGroup>
          </FormGrid>

          {/* Location Fields */}
          <FormGrid>
            <FormGroup>
              <label>{t('register.city')}</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder={t('register.cityPlaceholder')}
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </FormGroup>

            <FormGroup>
              <label>{t('register.region')}</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                placeholder={t('register.regionPlaceholder')}
              />
            </FormGroup>
          </FormGrid>

          {/* Language Preference */}
          <FormGroup>
            <label>{t('register.preferredLanguage')}</label>
            <select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleInputChange}>
              <option value="bg">{t('languages.bulgarian')}</option>
              <option value="en">{t('languages.english')}</option>
            </select>
          </FormGroup>

          {/* Terms and Privacy */}
          <CheckboxGroup>
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleCheckboxChange}
              id="accept-terms"
            />
            <label htmlFor="accept-terms">
              {t('register.acceptTerms')} <Link to="/terms">{t('register.termsLink')}</Link>
            </label>
            {errors.acceptTerms && <span className="error">{errors.acceptTerms}</span>}
          </CheckboxGroup>

          <CheckboxGroup>
            <input
              type="checkbox"
              name="acceptPrivacy"
              checked={formData.acceptPrivacy}
              onChange={handleCheckboxChange}
              id="accept-privacy"
            />
            <label htmlFor="accept-privacy">
              {t('register.acceptPrivacy')} <Link to="/privacy">{t('register.privacyLink')}</Link>
            </label>
            {errors.acceptPrivacy && <span className="error">{errors.acceptPrivacy}</span>}
          </CheckboxGroup>

          {/* Register Button */}
          <RegisterButton type="submit" disabled={loading}>
            {loading ? t('register.creatingAccount') : t('register.createAccount')}
          </RegisterButton>
        </Form>

        {/* Divider */}
        <Divider>{t('register.or')}</Divider>

        {/* Social Registration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SocialRegisterButton
            type="button"
            provider="google"
            onClick={handleGoogleRegister}
            disabled={socialLoading !== null}
          >
            <span className="icon">G</span>
            {socialLoading === 'google' ? t('register.creatingAccount') : t('register.continueWithGoogle')}
          </SocialRegisterButton>

          <SocialRegisterButton
            type="button"
            provider="facebook"
            onClick={handleFacebookRegister}
            disabled={socialLoading !== null}
          >
            <span className="icon">f</span>
            {socialLoading === 'facebook' ? t('register.creatingAccount') : t('register.continueWithFacebook')}
          </SocialRegisterButton>
        </div>

        {/* Links */}
        <Links>
          <Link to="/login" className="link">
            {t('register.alreadyHaveAccount')}
          </Link>
        </Links>
      </RegisterCard>
      </RegisterContent>
    </RegisterContainer>
  );
};

export default RegisterPage;