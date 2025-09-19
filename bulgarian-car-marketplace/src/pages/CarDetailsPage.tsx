// src/pages/CarDetailsPage.tsx
// Car Details Page for Bulgarian Car Marketplace

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { bulgarianCarService, BulgarianCar } from '../firebase';

// Styled Components
const CarDetailsContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  background: ${({ theme }) => theme.colors.error.light}20;
  border: 1px solid ${({ theme }) => theme.colors.error.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.error.main};

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const CarHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Breadcrumb = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  a {
    color: ${({ theme }) => theme.colors.text.secondary};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.main};
    }

    &:not(:last-child)::after {
      content: '>';
      margin: 0 ${({ theme }) => theme.spacing.sm};
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`;

const CarTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CarPrice = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &::before {
    content: '€';
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const CarGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const CarGallery = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.base};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

const MainImage = styled.div`
  width: 100%;
  height: 400px;
  background: ${({ theme }) => theme.colors.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Thumbnail = styled.div<{ active: boolean }>`
  width: 80px;
  height: 60px;
  background: ${({ theme }) => theme.colors.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  border: 2px solid ${({ theme, active }) => active ? theme.colors.primary.main : 'transparent'};
  overflow: hidden;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CarInfo = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.base};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

const InfoSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding-bottom: ${({ theme }) => theme.spacing.sm};
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary.main};
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  .label {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .value {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const CarDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FeaturesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Feature = styled.span`
  background: ${({ theme }) => theme.colors.grey[100]};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ContactSection = styled.div`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

const ContactTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  .icon {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }

  .info {
    h4 {
      font-size: ${({ theme }) => theme.typography.fontSize.base};
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
      margin-bottom: ${({ theme }) => theme.spacing.xs};
    }

    p {
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      opacity: 0.9;
      margin: 0;
    }
  }
`;

const ContactButton = styled(Link)`
  display: inline-block;
  background: white;
  color: ${({ theme }) => theme.colors.primary.main};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  text-align: center;

  &:hover {
    background: ${({ theme }) => theme.colors.grey[100]};
    transform: translateY(-2px);
  }
`;

// Car Details Page Component
const CarDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<BulgarianCar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Load car details
  useEffect(() => {
    const loadCarDetails = async () => {
      if (!id) {
        setError('Car ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const carData = await bulgarianCarService.getCarById(id);

        if (!carData) {
          setError('Car not found');
          return;
        }

        setCar(carData);

        // Mark as viewed
        await bulgarianCarService.markCarAsViewed(id);
      } catch (err) {
        console.error('Error loading car details:', err);
        setError('Failed to load car details');
      } finally {
        setLoading(false);
      }
    };

    loadCarDetails();
  }, [id]);

  if (loading) {
    return (
      <CarDetailsContainer>
        <PageContainer>
          <LoadingSpinner>
            {t('common.loading')}
          </LoadingSpinner>
        </PageContainer>
      </CarDetailsContainer>
    );
  }

  if (error || !car) {
    return (
      <CarDetailsContainer>
        <PageContainer>
          <ErrorMessage>
            <h3>{t('carDetails.error.title')}</h3>
            <p>{error || t('carDetails.error.notFound')}</p>
            <Link to="/cars" style={{ color: 'inherit', textDecoration: 'underline' }}>
              {t('carDetails.error.backToCars')}
            </Link>
          </ErrorMessage>
        </PageContainer>
      </CarDetailsContainer>
    );
  }

  return (
    <CarDetailsContainer>
      <PageContainer>
        {/* Breadcrumb */}
        <Breadcrumb>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/cars">{t('nav.cars')}</Link>
          <span>{car.title}</span>
        </Breadcrumb>

        {/* Car Header */}
        <CarHeader>
          <CarTitle>{car.title}</CarTitle>
          <CarPrice>{car.price.toLocaleString()}</CarPrice>
        </CarHeader>

        {/* Car Grid */}
        <CarGrid>
          {/* Car Gallery */}
          <CarGallery>
            <MainImage>
              {car.images.length > 0 ? (
                <img src={car.images[activeImageIndex]} alt={car.title} />
              ) : (
                '🚗'
              )}
            </MainImage>

            {car.images.length > 1 && (
              <ThumbnailGrid>
                {car.images.map((image, index) => (
                  <Thumbnail
                    key={index}
                    active={index === activeImageIndex}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={image} alt={`${car.title} ${index + 1}`} />
                  </Thumbnail>
                ))}
              </ThumbnailGrid>
            )}
          </CarGallery>

          {/* Car Info */}
          <CarInfo>
            {/* Basic Information */}
            <InfoSection>
              <h3>{t('carDetails.basicInfo')}</h3>
              <InfoGrid>
                <InfoItem>
                  <span className="label">{t('carDetails.year')}</span>
                  <span className="value">{car.year}</span>
                </InfoItem>
                <InfoItem>
                  <span className="label">{t('carDetails.mileage')}</span>
                  <span className="value">{car.mileage.toLocaleString()} km</span>
                </InfoItem>
                <InfoItem>
                  <span className="label">{t('carDetails.fuelType')}</span>
                  <span className="value">{car.fuelType}</span>
                </InfoItem>
                <InfoItem>
                  <span className="label">{t('carDetails.transmission')}</span>
                  <span className="value">{car.transmission}</span>
                </InfoItem>
                <InfoItem>
                  <span className="label">{t('carDetails.power')}</span>
                  <span className="value">{car.power} HP</span>
                </InfoItem>
                <InfoItem>
                  <span className="label">{t('carDetails.engineSize')}</span>
                  <span className="value">{car.engineSize} cc</span>
                </InfoItem>
              </InfoGrid>
            </InfoSection>

            {/* Location */}
            <InfoSection>
              <h3>{t('carDetails.location')}</h3>
              <InfoItem>
                <span className="label">{t('carDetails.address')}</span>
                <span className="value">
                  {car.location.city}, {car.location.region}, {car.location.country}
                </span>
              </InfoItem>
            </InfoSection>

            {/* Contact Section */}
            <ContactSection>
              <ContactTitle>{t('carDetails.contactSeller')}</ContactTitle>
              <ContactInfo>
                <ContactItem>
                  <span className="icon">👤</span>
                  <div className="info">
                    <h4>{car.ownerName}</h4>
                    <p>{t('carDetails.seller')}</p>
                  </div>
                </ContactItem>
                {car.ownerPhone && (
                  <ContactItem>
                    <span className="icon">📞</span>
                    <div className="info">
                      <h4>{car.ownerPhone}</h4>
                      <p>{t('carDetails.phone')}</p>
                    </div>
                  </ContactItem>
                )}
              </ContactInfo>
              <ContactButton to={`/contact/${car.id}`}>
                {t('carDetails.sendMessage')}
              </ContactButton>
            </ContactSection>
          </CarInfo>
        </CarGrid>

        {/* Description */}
        <InfoSection>
          <h3>{t('carDetails.description')}</h3>
          <CarDescription>{car.description}</CarDescription>
        </InfoSection>

        {/* Features */}
        {car.features.length > 0 && (
          <InfoSection>
            <h3>{t('carDetails.features')}</h3>
            <FeaturesList>
              {car.features.map((feature, index) => (
                <Feature key={index}>{feature}</Feature>
              ))}
            </FeaturesList>
          </InfoSection>
        )}
      </PageContainer>
    </CarDetailsContainer>
  );
};

export default CarDetailsPage;