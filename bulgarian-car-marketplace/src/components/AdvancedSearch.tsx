// src/components/AdvancedSearch.tsx
// Advanced Search Component for Bulgarian Car Marketplace

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { CarSearchFilters } from '../firebase';

interface AdvancedSearchProps {
  filters: CarSearchFilters;
  onFiltersChange: (filters: CarSearchFilters) => void;
  onSearch: () => void;
  onClear: () => void;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

const SearchContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.base};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;

const SearchHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .toggle-icon {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    transition: transform 0.3s ease-in-out;
  }
`;

const SearchContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${({ isExpanded }) => isExpanded ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const SearchForm = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SearchRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SearchGroup = styled.div`
  label {
    display: block;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }

  input, select, textarea {
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

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

const PriceRange = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  input {
    flex: 1;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};

  label {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    cursor: pointer;

    input[type="checkbox"] {
      width: auto;
      margin: 0;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

const ActionButton = styled.button`
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

  &.clear {
    border-color: ${({ theme }) => theme.colors.grey[400]};
    background: ${({ theme }) => theme.colors.grey[100]};
    color: ${({ theme }) => theme.colors.grey[700]};

    &:hover {
      background: ${({ theme }) => theme.colors.grey[200]};
      border-color: ${({ theme }) => theme.colors.grey[500]};
    }
  }
`;

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  onClear,
  isExpanded = false,
  onToggleExpanded
}) => {
  const { t } = useTranslation();
  const [localFilters, setLocalFilters] = useState<CarSearchFilters>(filters);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (key: keyof CarSearchFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleLocationChange = (field: 'city' | 'region', value: string) => {
    const newLocation = {
      ...localFilters.location,
      [field]: value
    };
    handleInputChange('location', newLocation);
  };

  const handleFeaturesChange = (feature: string, checked: boolean) => {
    const currentFeatures = localFilters.features || [];
    const newFeatures = checked
      ? [...currentFeatures, feature]
      : currentFeatures.filter(f => f !== feature);
    handleInputChange('features', newFeatures);
  };

  const handleSearch = () => {
    onSearch();
  };

  const handleClear = () => {
    setLocalFilters({});
    onClear();
  };

  const bulgarianMakes = [
    'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Toyota', 'Honda',
    'Ford', 'Opel', 'Renault', 'Peugeot', 'Citroën', 'Fiat', 'Nissan',
    'Hyundai', 'Kia', 'Škoda', 'Seat', 'Dacia', 'Suzuki', 'Mazda'
  ];

  const bulgarianCities = [
    'София', 'Пловдив', 'Варна', 'Бургас', 'Русе', 'Стара Загора',
    'Плевен', 'Сливен', 'Добрич', 'Шумен', 'Перник', 'Хасково',
    'Ямбол', 'Пазарджик', 'Благоевград', 'Велико Търново', 'Враца',
    'Габрово', 'Асеновград', 'Видин', 'Кърджали', 'Кюстендил', 'Монтана',
    'Търговище', 'Силистра', 'Ловеч', 'Разград', 'Смолян'
  ];

  const carFeatures = [
    'Климатична инсталация', 'Навигация', 'Камера за обратно виждане',
    'Парктроник', 'Круиз контрол', 'Сензорни фарове', 'LED фарове',
    'Ел. огледала', 'Ел. седалки', 'Подгрев на седалки', 'Панорамен покрив',
    '4x4', 'Автопилот', 'Apple CarPlay', 'Android Auto'
  ];

  return (
    <SearchContainer>
      <SearchHeader onClick={onToggleExpanded}>
        <h3>{t('search.advanced.title')}</h3>
        <span className="toggle-icon">{isExpanded ? '−' : '+'}</span>
      </SearchHeader>

      <SearchContent isExpanded={isExpanded}>
        <SearchForm>
          {/* Basic Information */}
          <SearchRow>
            <SearchGroup>
              <label>{t('search.make')}</label>
              <select
                value={localFilters.make || ''}
                onChange={(e) => handleInputChange('make', e.target.value)}
              >
                <option value="">{t('search.allMakes')}</option>
                {bulgarianMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </SearchGroup>

            <SearchGroup>
              <label>{t('search.model')}</label>
              <input
                type="text"
                placeholder={t('search.modelPlaceholder')}
                value={localFilters.model || ''}
                onChange={(e) => handleInputChange('model', e.target.value)}
              />
            </SearchGroup>

            <SearchGroup>
              <label>{t('search.fuelType')}</label>
              <select
                value={localFilters.fuelType || ''}
                onChange={(e) => handleInputChange('fuelType', e.target.value)}
              >
                <option value="">{t('search.allFuelTypes')}</option>
                <option value="petrol">{t('search.petrol')}</option>
                <option value="diesel">{t('search.diesel')}</option>
                <option value="electric">{t('search.electric')}</option>
                <option value="hybrid">{t('search.hybrid')}</option>
                <option value="gas">{t('search.gas')}</option>
              </select>
            </SearchGroup>

            <SearchGroup>
              <label>{t('search.transmission')}</label>
              <select
                value={localFilters.transmission || ''}
                onChange={(e) => handleInputChange('transmission', e.target.value)}
              >
                <option value="">{t('search.allTransmissions')}</option>
                <option value="manual">{t('search.manual')}</option>
                <option value="automatic">{t('search.automatic')}</option>
                <option value="semi-automatic">{t('search.semiAutomatic')}</option>
              </select>
            </SearchGroup>
          </SearchRow>

          {/* Price Range */}
          <SearchRow>
            <SearchGroup>
              <label>{t('search.priceRange')}</label>
              <PriceRange>
                <input
                  type="number"
                  placeholder={t('search.minPrice')}
                  value={localFilters.minPrice || ''}
                  onChange={(e) => handleInputChange('minPrice', parseInt(e.target.value) || undefined)}
                />
                <input
                  type="number"
                  placeholder={t('search.maxPrice')}
                  value={localFilters.maxPrice || ''}
                  onChange={(e) => handleInputChange('maxPrice', parseInt(e.target.value) || undefined)}
                />
              </PriceRange>
            </SearchGroup>

            <SearchGroup>
              <label>{t('search.yearRange')}</label>
              <PriceRange>
                <input
                  type="number"
                  placeholder={t('search.minYear')}
                  value={localFilters.minYear || ''}
                  onChange={(e) => handleInputChange('minYear', parseInt(e.target.value) || undefined)}
                />
                <input
                  type="number"
                  placeholder={t('search.maxYear')}
                  value={localFilters.maxYear || ''}
                  onChange={(e) => handleInputChange('maxYear', parseInt(e.target.value) || undefined)}
                />
              </PriceRange>
            </SearchGroup>

            <SearchGroup>
              <label>{t('search.maxMileage')}</label>
              <input
                type="number"
                placeholder={t('search.maxMileagePlaceholder')}
                value={localFilters.maxMileage || ''}
                onChange={(e) => handleInputChange('maxMileage', parseInt(e.target.value) || undefined)}
              />
            </SearchGroup>
          </SearchRow>

          {/* Location */}
          <SearchRow>
            <SearchGroup>
              <label>{t('search.city')}</label>
              <select
                value={localFilters.location?.city || ''}
                onChange={(e) => handleLocationChange('city', e.target.value)}
              >
                <option value="">{t('search.allCities')}</option>
                {bulgarianCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </SearchGroup>

            <SearchGroup>
              <label>{t('search.region')}</label>
              <select
                value={localFilters.location?.region || ''}
                onChange={(e) => handleLocationChange('region', e.target.value)}
              >
                <option value="">{t('search.allRegions')}</option>
                <option value="София">{t('regions.sofia')}</option>
                <option value="Пловдив">{t('regions.plovdiv')}</option>
                <option value="Варна">{t('regions.varna')}</option>
                <option value="Бургас">{t('regions.burgas')}</option>
                <option value="Други">{t('regions.other')}</option>
              </select>
            </SearchGroup>

            <SearchGroup>
              <label>{t('search.radius')}</label>
              <select
                value={localFilters.location?.radius || ''}
                onChange={(e) => handleInputChange('location', {
                  ...localFilters.location,
                  radius: parseInt(e.target.value) || undefined
                })}
              >
                <option value="">{t('search.anyDistance')}</option>
                <option value="10">10 km</option>
                <option value="25">25 km</option>
                <option value="50">50 km</option>
                <option value="100">100 km</option>
                <option value="200">200 km</option>
              </select>
            </SearchGroup>
          </SearchRow>

          {/* Features */}
          <SearchRow>
            <SearchGroup style={{ gridColumn: '1 / -1' }}>
              <label>{t('search.features')}</label>
              <CheckboxGroup>
                {carFeatures.map(feature => (
                  <label key={feature}>
                    <input
                      type="checkbox"
                      checked={(localFilters.features || []).includes(feature)}
                      onChange={(e) => handleFeaturesChange(feature, e.target.checked)}
                    />
                    {feature}
                  </label>
                ))}
              </CheckboxGroup>
            </SearchGroup>
          </SearchRow>

          {/* Keywords */}
          <SearchRow>
            <SearchGroup style={{ gridColumn: '1 / -1' }}>
              <label>{t('search.keywords')}</label>
              <textarea
                placeholder={t('search.keywordsPlaceholder')}
                value={localFilters.keywords || ''}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
              />
            </SearchGroup>
          </SearchRow>

          {/* Action Buttons */}
          <ActionButtons>
            <ActionButton onClick={handleSearch}>
              {t('search.search')}
            </ActionButton>
            <ActionButton className="clear" onClick={handleClear}>
              {t('search.clear')}
            </ActionButton>
          </ActionButtons>
        </SearchForm>
      </SearchContent>
    </SearchContainer>
  );
};

export default AdvancedSearch;