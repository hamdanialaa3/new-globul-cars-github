// src/pages/HomePage.tsx
// Home Page for Bulgarian Car Marketplace

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { bulgarianCarService, BulgarianCar } from '../firebase';

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary.main} 0%, ${({ theme }) => theme.colors.primary.dark} 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  opacity: 0.9;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
`;

const HeroButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.secondary.main};
  color: white;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all 0.3s ease-in-out;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary.dark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }

  &.secondary {
    background: transparent;
    border: 2px solid white;
    color: white;

    &:hover {
      background: white;
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

const StatsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  background: ${({ theme }) => theme.colors.background.paper};
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
`;

const StatItem = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
    color: ${({ theme }) => theme.colors.primary.main};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const FeaturedCarsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  background: ${({ theme }) => theme.colors.grey[50]};
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  h2 {
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

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const CarCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.base};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const CarImage = styled.div`
  height: 200px;
  background: ${({ theme }) => theme.colors.grey[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.colors.grey[400]};
`;

const CarContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CarTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CarPrice = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &::before {
    content: '€';
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const CarDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CarDetail = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ViewAllButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all 0.3s ease-in-out;
  text-align: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-2px);
  }
`;

const FeaturesSection = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  background: ${({ theme }) => theme.colors.background.paper};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['2xl']};

  .icon {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    display: block;
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }
`;

// Home Page Component
const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [featuredCars, setFeaturedCars] = useState<BulgarianCar[]>([]);
  const [loading, setLoading] = useState(true);

  // Load featured cars
  useEffect(() => {
    const loadFeaturedCars = async () => {
      try {
        const cars = await bulgarianCarService.getPopularCars(6);
        setFeaturedCars(cars);
      } catch (error) {
        console.error('Error loading featured cars:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedCars();
  }, []);

  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            {t('home.hero.title')}
          </HeroTitle>
          <HeroSubtitle>
            {t('home.hero.subtitle')}
          </HeroSubtitle>
          <HeroButtons>
            <HeroButton to="/cars">
              {t('home.hero.browseCars')}
            </HeroButton>
            <HeroButton to="/sell" className="secondary">
              {t('home.hero.sellCar')}
            </HeroButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      {/* Stats Section */}
      <StatsSection>
        <StatsContainer>
          <StatItem>
            <h3>15,000+</h3>
            <p>{t('home.stats.cars')}</p>
          </StatItem>
          <StatItem>
            <h3>8,500+</h3>
            <p>{t('home.stats.satisfiedCustomers')}</p>
          </StatItem>
          <StatItem>
            <h3>500+</h3>
            <p>{t('home.stats.dealers')}</p>
          </StatItem>
          <StatItem>
            <h3>98%</h3>
            <p>{t('home.stats.satisfaction')}</p>
          </StatItem>
        </StatsContainer>
      </StatsSection>

      {/* Featured Cars Section */}
      <FeaturedCarsSection>
        <SectionContainer>
          <SectionHeader>
            <h2>{t('home.featured.title')}</h2>
            <p>{t('home.featured.subtitle')}</p>
          </SectionHeader>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              {t('common.loading')}
            </div>
          ) : (
            <>
              <CarsGrid>
                {featuredCars.map((car) => (
                  <CarCard key={car.id}>
                    <Link to={`/cars/${car.id}`} style={{ textDecoration: 'none' }}>
                      <CarImage>
                        {car.images.length > 0 ? (
                          <img
                            src={car.images[0]}
                            alt={car.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          '🚗'
                        )}
                      </CarImage>
                      <CarContent>
                        <CarTitle>{car.title}</CarTitle>
                        <CarPrice>{car.price.toLocaleString()}</CarPrice>
                        <CarDetails>
                          <CarDetail>📅 {car.year}</CarDetail>
                          <CarDetail>⚡ {car.power} HP</CarDetail>
                          <CarDetail>⛽ {car.fuelType}</CarDetail>
                        </CarDetails>
                        <CarDetails>
                          <CarDetail>📍 {car.location.city}</CarDetail>
                          <CarDetail>👁️ {car.views}</CarDetail>
                        </CarDetails>
                      </CarContent>
                    </Link>
                  </CarCard>
                ))}
              </CarsGrid>

              <div style={{ textAlign: 'center' }}>
                <ViewAllButton to="/cars">
                  {t('home.featured.viewAll')}
                </ViewAllButton>
              </div>
            </>
          )}
        </SectionContainer>
      </FeaturedCarsSection>

      {/* Features Section */}
      <FeaturesSection>
        <SectionContainer>
          <SectionHeader>
            <h2>{t('home.features.title')}</h2>
            <p>{t('home.features.subtitle')}</p>
          </SectionHeader>

          <FeaturesGrid>
            <FeatureCard>
              <span className="icon">🔍</span>
              <h3>{t('home.features.search.title')}</h3>
              <p>{t('home.features.search.description')}</p>
            </FeatureCard>

            <FeatureCard>
              <span className="icon">✅</span>
              <h3>{t('home.features.verified.title')}</h3>
              <p>{t('home.features.verified.description')}</p>
            </FeatureCard>

            <FeatureCard>
              <span className="icon">💰</span>
              <h3>{t('home.features.finance.title')}</h3>
              <p>{t('home.features.finance.description')}</p>
            </FeatureCard>

            <FeatureCard>
              <span className="icon">🛡️</span>
              <h3>{t('home.features.insurance.title')}</h3>
              <p>{t('home.features.insurance.description')}</p>
            </FeatureCard>
          </FeaturesGrid>
        </SectionContainer>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default HomePage;