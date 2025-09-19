// src/pages/CarsPage.tsx
// Cars Page for Bulgarian Car Marketplace

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { bulgarianCarService, BulgarianCar, CarSearchFilters } from '../firebase';
import AdvancedSearch from '../components/AdvancedSearch';

// Styled Components
const CarsContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const FiltersSection = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.base};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FilterGroup = styled.div`
  label {
    display: block;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }

  select, input {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.grey[300]};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    background: ${({ theme }) => theme.colors.background.paper};
    transition: border-color 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20;
    }
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    border-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary.main};

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: white;
    }
  }
`;

const ResultsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const SortSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background: ${({ theme }) => theme.colors.background.paper};
  cursor: pointer;
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
  position: relative;
`;

const CarBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.secondary.main};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const CarContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CarTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

const CarLocation = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

// Cars Page Component
const CarsPage: React.FC = () => {
  const { t } = useTranslation();
  const [cars, setCars] = useState<BulgarianCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CarSearchFilters>({});
  const [sortBy, setSortBy] = useState<'createdAt' | 'price' | 'mileage' | 'year'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isAdvancedSearchExpanded, setIsAdvancedSearchExpanded] = useState(false);

  // Load cars
  const loadCars = useCallback(async () => {
    try {
      setLoading(true);
      const result = await bulgarianCarService.searchCars(
        filters,
        sortBy,
        sortOrder,
        20
      );
      setCars(result.cars);
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy, sortOrder]);

  // Initial load
  useEffect(() => {
    loadCars();
  }, [loadCars]);

  // Handle filter changes
  const handleFilterChange = (key: keyof CarSearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({});
    setIsAdvancedSearchExpanded(false);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    const [field, order] = value.split('_');
    setSortBy(field as any);
    setSortOrder(order as any);
  };

  return (
    <CarsContainer>
      <PageContainer>
        {/* Page Header */}
        <PageHeader>
          <h1>{t('cars.title')}</h1>
          <p>{t('cars.subtitle')}</p>
        </PageHeader>

        {/* Advanced Search */}
        <AdvancedSearch
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={loadCars}
          onClear={clearFilters}
          isExpanded={isAdvancedSearchExpanded}
          onToggleExpanded={() => setIsAdvancedSearchExpanded(!isAdvancedSearchExpanded)}
        />

        {/* Filters Section */}
        <FiltersSection>
          <FiltersGrid>
            <FilterGroup>
              <label>{t('cars.filters.make')}</label>
              <select
                value={filters.make || ''}
                onChange={(e) => handleFilterChange('make', e.target.value)}
              >
                <option value="">{t('cars.filters.allMakes')}</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Audi">Audi</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
                <option value="Opel">Opel</option>
                <option value="Renault">Renault</option>
                <option value="Peugeot">Peugeot</option>
              </select>
            </FilterGroup>

            <FilterGroup>
              <label>{t('cars.filters.priceRange')}</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="number"
                  placeholder={t('cars.filters.minPrice')}
                  value={filters.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || undefined)}
                />
                <input
                  type="number"
                  placeholder={t('cars.filters.maxPrice')}
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || undefined)}
                />
              </div>
            </FilterGroup>

            <FilterGroup>
              <label>{t('cars.filters.fuelType')}</label>
              <select
                value={filters.fuelType || ''}
                onChange={(e) => handleFilterChange('fuelType', e.target.value)}
              >
                <option value="">{t('cars.filters.allFuelTypes')}</option>
                <option value="petrol">{t('cars.fuelTypes.petrol')}</option>
                <option value="diesel">{t('cars.fuelTypes.diesel')}</option>
                <option value="electric">{t('cars.fuelTypes.electric')}</option>
                <option value="hybrid">{t('cars.fuelTypes.hybrid')}</option>
                <option value="gas">{t('cars.fuelTypes.gas')}</option>
              </select>
            </FilterGroup>

            <FilterGroup>
              <label>{t('cars.filters.year')}</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="number"
                  placeholder={t('cars.filters.minYear')}
                  value={filters.minYear || ''}
                  onChange={(e) => handleFilterChange('minYear', parseInt(e.target.value) || undefined)}
                />
                <input
                  type="number"
                  placeholder={t('cars.filters.maxYear')}
                  value={filters.maxYear || ''}
                  onChange={(e) => handleFilterChange('maxYear', parseInt(e.target.value) || undefined)}
                />
              </div>
            </FilterGroup>
          </FiltersGrid>

          <FilterActions>
            <FilterButton onClick={loadCars}>
              {t('cars.filters.search')}
            </FilterButton>
            <FilterButton className="secondary" onClick={clearFilters}>
              {t('cars.filters.clear')}
            </FilterButton>
          </FilterActions>
        </FiltersSection>

        {/* Results Section */}
        <ResultsSection>
          <ResultsHeader>
            <div>
              <h2>{t('cars.results.title')}</h2>
              <span>{cars.length} {t('cars.results.found')}</span>
            </div>

            <SortSelect
              value={`${sortBy}_${sortOrder}`}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="createdAt_desc">{t('cars.sort.newest')}</option>
              <option value="createdAt_asc">{t('cars.sort.oldest')}</option>
              <option value="price_asc">{t('cars.sort.priceLow')}</option>
              <option value="price_desc">{t('cars.sort.priceHigh')}</option>
              <option value="year_desc">{t('cars.sort.yearNew')}</option>
              <option value="year_asc">{t('cars.sort.yearOld')}</option>
              <option value="mileage_asc">{t('cars.sort.mileageLow')}</option>
              <option value="mileage_desc">{t('cars.sort.mileageHigh')}</option>
            </SortSelect>
          </ResultsHeader>

          {loading ? (
            <LoadingSpinner>
              {t('common.loading')}
            </LoadingSpinner>
          ) : cars.length === 0 ? (
            <NoResults>
              <h3>{t('cars.noResults.title')}</h3>
              <p>{t('cars.noResults.message')}</p>
              <FilterButton onClick={clearFilters}>
                {t('cars.noResults.clearFilters')}
              </FilterButton>
            </NoResults>
          ) : (
            <CarsGrid>
              {cars.map((car) => (
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
                      {car.isFeatured && (
                        <CarBadge>{t('cars.featured')}</CarBadge>
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
                        <CarDetail>🛣️ {car.mileage.toLocaleString()} km</CarDetail>
                        <CarDetail>🔄 {car.transmission}</CarDetail>
                      </CarDetails>
                      <CarLocation>
                        📍 {car.location.city}, {car.location.region}
                      </CarLocation>
                    </CarContent>
                  </Link>
                </CarCard>
              ))}
            </CarsGrid>
          )}
        </ResultsSection>
      </PageContainer>
    </CarsContainer>
  );
};

export default CarsPage;