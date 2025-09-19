// src/pages/ProfilePage.tsx
// User Profile Page for Bulgarian Car Marketplace

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { bulgarianAuthService, BulgarianUser } from '../firebase';

// Styled Components
const ProfileContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
  background: ${({ theme }) => theme.colors.grey[50]};
`;

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing['3xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.base};

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    color: ${({ theme }) => theme.colors.text.secondary};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSidebar = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.base};
  height: fit-content;
`;

const ProfileAvatar = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.main};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    color: ${({ theme }) => theme.colors.primary.contrastText};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .name {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .email {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const StatItem = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.grey[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  .stat-number {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary.main};
    display: block;
  }

  .stat-label {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
`;

const ProfileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme, variant }) => {
    switch (variant) {
      case 'secondary':
        return theme.colors.grey[300];
      case 'danger':
        return theme.colors.error.main;
      default:
        return theme.colors.primary.main;
    }
  }};
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'secondary':
        return 'transparent';
      case 'danger':
        return theme.colors.error.main;
      default:
        return theme.colors.primary.main;
    }
  }};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'secondary':
        return theme.colors.text.primary;
      case 'danger':
        return theme.colors.error.contrastText;
      default:
        return theme.colors.primary.contrastText;
    }
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: left;

  &:hover {
    background: ${({ theme, variant }) => {
      switch (variant) {
        case 'secondary':
          return theme.colors.grey[100];
        case 'danger':
          return theme.colors.error.dark;
        default:
          return theme.colors.primary.dark;
      }
    }};
    border-color: ${({ theme, variant }) => {
      switch (variant) {
        case 'secondary':
          return theme.colors.grey[400];
        case 'danger':
          return theme.colors.error.dark;
        default:
          return theme.colors.primary.dark;
      }
    }};
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

const ContentSection = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.base};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.main};

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }

  .edit-btn {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrastText};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    cursor: pointer;
    transition: background 0.2s ease-in-out;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

  input, select, textarea {
    padding: ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.grey[300]};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    background: ${({ theme }) => theme.colors.background.paper};
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  padding-top: ${({ theme }) => theme.spacing['2xl']};
  border-top: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

const SaveButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.success.main};
  color: ${({ theme }) => theme.colors.success.contrastText};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.success.dark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing['2xl']};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.grey[100]};
    border-color: ${({ theme }) => theme.colors.grey[400]};
  }
`;

const CarsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CarCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.base};
  }

  .car-image {
    width: 100%;
    height: 150px;
    background: ${({ theme }) => theme.colors.grey[200]};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    color: ${({ theme }) => theme.colors.grey[400]};
  }

  .car-title {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .car-price {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary.main};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .car-details {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  .car-actions {
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
    justify-content: space-between;
  }

  .action-btn {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.grey[300]};
    background: transparent;
    color: ${({ theme }) => theme.colors.text.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.primary.contrastText};
      border-color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  color: ${({ theme }) => theme.colors.text.secondary};

  .empty-icon {
    font-size: ${({ theme }) => theme.typography.fontSize['6xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    display: block;
  }

  .empty-title {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  .empty-description {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }
`;

// Profile Page Component
const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<BulgarianUser | null>(null);
  const [userCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<{
    displayName: string;
    phoneNumber: string;
    city: string;
    region: string;
    bio: string;
    preferredLanguage: string;
  }>({
    displayName: '',
    phoneNumber: '',
    city: '',
    region: '',
    bio: '',
    preferredLanguage: 'bg'
  });

  // Load user data
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);

      // Get current user
      const currentUser = await bulgarianAuthService.getCurrentUserProfile();
      if (currentUser) {
        setUser(currentUser);
        setFormData({
          displayName: currentUser.displayName || '',
          phoneNumber: currentUser.phoneNumber || '',
          city: currentUser.location?.city || '',
          region: currentUser.location?.region || '',
          bio: currentUser.bio || '',
          preferredLanguage: currentUser.preferredLanguage || 'bg'
        });

        // Load user's cars
        // const cars = await bulgarianCarService.getUserCars(currentUser.id);
        // setUserCars(cars);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    try {
      if (!user) return;

      await bulgarianAuthService.updateUserProfile({
        uid: user.uid,
        displayName: formData.displayName,
        phoneNumber: formData.phoneNumber,
        bio: formData.bio,
        location: {
          city: formData.city,
          region: formData.region,
          postalCode: ''
        },
        preferredLanguage: formData.preferredLanguage as 'bg' | 'en'
      });

      setEditing(false);
      await loadUserData(); // Reload data
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(t('profile.updateError'));
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        phoneNumber: user.phoneNumber || '',
        city: user.location?.city || '',
        region: user.location?.region || '',
        bio: user.bio || '',
        preferredLanguage: user.preferredLanguage || 'bg'
      });
    }
    setEditing(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await bulgarianAuthService.signOut();
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <ProfileContainer>
        <PageContainer>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            {t('common.loading')}
          </div>
        </PageContainer>
      </ProfileContainer>
    );
  }

  if (!user) {
    return (
      <ProfileContainer>
        <PageContainer>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            {t('profile.notLoggedIn')}
          </div>
        </PageContainer>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <PageContainer>
        {/* Page Header */}
        <PageHeader>
          <h1>{t('profile.title')}</h1>
          <p>{t('profile.subtitle')}</p>
        </PageHeader>

        {/* Profile Grid */}
        <ProfileGrid>
          {/* Profile Sidebar */}
          <ProfileSidebar>
            {/* Avatar and Basic Info */}
            <ProfileAvatar>
              <div className="avatar">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>
              <div className="name">{user.displayName || t('profile.anonymous')}</div>
              <div className="email">{user.email}</div>
            </ProfileAvatar>

            {/* Stats */}
            <ProfileStats>
              <StatItem>
                <span className="stat-number">{userCars.length}</span>
                <span className="stat-label">{t('profile.stats.cars')}</span>
              </StatItem>
              <StatItem>
                <span className="stat-number">0</span>
                <span className="stat-label">{t('profile.stats.favorites')}</span>
              </StatItem>
            </ProfileStats>

            {/* Actions */}
            <ProfileActions>
              <ActionButton onClick={() => setEditing(!editing)}>
                {editing ? t('profile.cancelEdit') : t('profile.editProfile')}
              </ActionButton>
              <ActionButton variant="secondary" onClick={() => window.location.href = '/sell-car'}>
                {t('profile.addCar')}
              </ActionButton>
              <ActionButton variant="secondary" onClick={() => window.location.href = '/messages'}>
                {t('profile.messages')}
              </ActionButton>
              <ActionButton variant="danger" onClick={handleLogout}>
                {t('profile.logout')}
              </ActionButton>
            </ProfileActions>
          </ProfileSidebar>

          {/* Profile Content */}
          <ProfileContent>
            {/* Personal Information */}
            <ContentSection>
              <SectionHeader>
                <h2>{t('profile.personalInfo')}</h2>
                {!editing && (
                  <button className="edit-btn" onClick={() => setEditing(true)}>
                    {t('profile.edit')}
                  </button>
                )}
              </SectionHeader>

              {editing ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
                  <FormGrid>
                    <FormGroup>
                      <label>{t('profile.displayName')}</label>
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        placeholder={t('profile.displayNamePlaceholder')}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>{t('profile.phoneNumber')}</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="+359 88 123 4567"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>{t('profile.city')}</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder={t('profile.cityPlaceholder')}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>{t('profile.region')}</label>
                      <input
                        type="text"
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        placeholder={t('profile.regionPlaceholder')}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>{t('profile.preferredLanguage')}</label>
                      <select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleInputChange}>
                        <option value="bg">{t('languages.bulgarian')}</option>
                        <option value="en">{t('languages.english')}</option>
                      </select>
                    </FormGroup>
                  </FormGrid>

                  <FormGroup>
                    <label>{t('profile.bio')}</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder={t('profile.bioPlaceholder')}
                      rows={4}
                    />
                  </FormGroup>

                  <FormActions>
                    <CancelButton type="button" onClick={handleCancelEdit}>
                      {t('common.cancel')}
                    </CancelButton>
                    <SaveButton type="submit">
                      {t('profile.saveChanges')}
                    </SaveButton>
                  </FormActions>
                </form>
              ) : (
                <div>
                  <FormGrid>
                    <div>
                      <strong>{t('profile.displayName')}:</strong> {user.displayName || t('profile.notSet')}
                    </div>
                    <div>
                      <strong>{t('profile.phoneNumber')}:</strong> {user.phoneNumber || t('profile.notSet')}
                    </div>
                    <div>
                      <strong>{t('profile.city')}:</strong> {user.location?.city || t('profile.notSet')}
                    </div>
                    <div>
                      <strong>{t('profile.region')}:</strong> {user.location?.region || t('profile.notSet')}
                    </div>
                    <div>
                      <strong>{t('profile.preferredLanguage')}:</strong> {
                        user.preferredLanguage === 'bg' ? t('languages.bulgarian') : t('languages.english')
                      }
                    </div>
                    <div>
                      <strong>{t('profile.memberSince')}:</strong> {
                        user.createdAt ? new Date(user.createdAt).toLocaleDateString() : t('profile.notSet')
                      }
                    </div>
                  </FormGrid>

                  {user.bio && (
                    <div style={{ marginTop: '2rem' }}>
                      <strong>{t('profile.bio')}:</strong>
                      <p style={{ marginTop: '0.5rem', color: '#666' }}>{user.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </ContentSection>

            {/* My Cars */}
            <ContentSection>
              <SectionHeader>
                <h2>{t('profile.myCars')}</h2>
                <button className="edit-btn" onClick={() => window.location.href = '/sell-car'}>
                  {t('profile.addCar')}
                </button>
              </SectionHeader>

              {userCars.length > 0 ? (
                <CarsList>
                  {userCars.map((car) => (
                    <CarCard key={car.id}>
                      <div className="car-image">
                        {car.mainImage ? (
                          <img src={car.mainImage} alt={car.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          '🚗'
                        )}
                      </div>
                      <div className="car-title">{car.title}</div>
                      <div className="car-price">€{car.price.toLocaleString()}</div>
                      <div className="car-details">
                        {car.year} • {car.mileage?.toLocaleString()} km • {car.fuelType}
                      </div>
                      <div className="car-actions">
                        <button
                          className="action-btn"
                          onClick={() => window.location.href = `/cars/${car.id}`}
                        >
                          {t('profile.view')}
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => window.location.href = `/cars/${car.id}/edit`}
                        >
                          {t('profile.edit')}
                        </button>
                      </div>
                    </CarCard>
                  ))}
                </CarsList>
              ) : (
                <EmptyState>
                  <span className="empty-icon">🚗</span>
                  <div className="empty-title">{t('profile.noCars')}</div>
                  <div className="empty-description">{t('profile.noCarsDescription')}</div>
                  <button
                    className="edit-btn"
                    onClick={() => window.location.href = '/sell-car'}
                    style={{ margin: '0 auto' }}
                  >
                    {t('profile.addFirstCar')}
                  </button>
                </EmptyState>
              )}
            </ContentSection>
          </ProfileContent>
        </ProfileGrid>
      </PageContainer>
    </ProfileContainer>
  );
};

export default ProfilePage;