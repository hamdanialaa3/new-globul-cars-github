// src/pages/SellCarPage.tsx
// Sell Car Page for Bulgarian Car Marketplace

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { bulgarianCarService, BulgarianCar } from '../firebase';

// Styled Components
const SellCarContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
  background: ${({ theme }) => theme.colors.grey[50]};
`;

const PageContainer = styled.div`
  max-width: 800px;
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

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['3xl']};
  box-shadow: ${({ theme }) => theme.shadows.base};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

const FormSection = styled.div`
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

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.primary.main};
  }

  label {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
    cursor: pointer;
  }
`;

const ImageUpload = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
  background: ${({ theme }) => theme.colors.grey[50]};
  transition: border-color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.primary.main}10;
  }

  .upload-icon {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    color: ${({ theme }) => theme.colors.grey[400]};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    display: block;
  }

  .upload-text {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .upload-hint {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ImageItem = styled.div`
  position: relative;
  width: 100px;
  height: 75px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grey[200]};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .remove-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    background: ${({ theme }) => theme.colors.error.main};
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  padding-top: ${({ theme }) => theme.spacing['2xl']};
  border-top: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  border: 2px solid ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.grey[300] : theme.colors.primary.main};
  background: ${({ theme, variant }) =>
    variant === 'secondary' ? 'transparent' : theme.colors.primary.main};
  color: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.text.primary : theme.colors.primary.contrastText};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  min-width: 150px;

  &:hover {
    background: ${({ theme, variant }) =>
      variant === 'secondary' ? theme.colors.grey[100] : theme.colors.primary.dark};
    border-color: ${({ theme, variant }) =>
      variant === 'secondary' ? theme.colors.grey[400] : theme.colors.primary.dark};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;

    &:hover {
      background: ${({ theme, variant }) =>
        variant === 'secondary' ? 'transparent' : theme.colors.primary.main};
      border-color: ${({ theme }) => theme.colors.primary.main};
      transform: none;
    }
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  background: ${({ theme }) => theme.colors.success.light}20;
  border: 1px solid ${({ theme }) => theme.colors.success.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.success.main};

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

// Sell Car Page Component
const SellCarPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    // Basic Info
    make: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    fuelType: '',
    transmission: '',
    engineSize: '',
    power: '',
    condition: '',
    color: '',

    // Location
    city: '',
    region: '',
    postalCode: '',

    // Description
    title: '',
    description: '',
    features: [] as string[],

    // Additional
    hasBulgarianRegistration: false,
    vinNumber: '',
    firstRegistrationDate: '',
    inspectionValidUntil: ''
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle features
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 10) {
      alert(t('sellCar.maxImages'));
      return;
    }
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Validate form
      if (!validateForm()) {
        return;
      }

      // Create car data
      const carData: Omit<BulgarianCar, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'favorites'> = {
        ownerId: 'current-user-id', // This should come from auth context
        ownerName: 'Current User', // This should come from auth context
        ownerEmail: 'user@example.com', // This should come from auth context

        // Basic Info
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        mileage: parseInt(formData.mileage),
        price: parseInt(formData.price),
        currency: 'EUR', // Bulgarian market uses EUR
        fuelType: formData.fuelType as any,
        transmission: formData.transmission as any,
        engineSize: parseInt(formData.engineSize),
        power: parseInt(formData.power),
        condition: formData.condition as any,
        color: formData.color,

        // Location
        location: {
          city: formData.city,
          region: formData.region,
          postalCode: formData.postalCode,
          country: 'Bulgaria'
        },

        // Description
        title: formData.title,
        description: formData.description,
        features: formData.features.filter(f => f.trim() !== ''),

        // Status
        isActive: true,
        isSold: false,
        isFeatured: false,
        images: [],
        mainImage: '',

        // Bulgarian Specific
        hasBulgarianRegistration: formData.hasBulgarianRegistration,
        vinNumber: formData.vinNumber || undefined,
        firstRegistrationDate: formData.firstRegistrationDate ? new Date(formData.firstRegistrationDate) : undefined,
        inspectionValidUntil: formData.inspectionValidUntil ? new Date(formData.inspectionValidUntil) : undefined
      };

      // Create car listing
      const carId = await bulgarianCarService.createCarListing(carData);

      // Upload images if any
      if (images.length > 0) {
        const imageUrls = await bulgarianCarService.uploadCarImages(carId, images);

        // Update car with image URLs
        await bulgarianCarService.updateCarListing(carId, {
          images: imageUrls,
          mainImage: imageUrls[0]
        }, carData.ownerId);
      }

      setSuccess(true);

      // Redirect to car details after 2 seconds
      setTimeout(() => {
        navigate(`/cars/${carId}`);
      }, 2000);

    } catch (error) {
      console.error('Error creating car listing:', error);
      alert(t('sellCar.error'));
    } finally {
      setLoading(false);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!formData.make || !formData.model || !formData.year || !formData.price) {
      alert(t('sellCar.validation.required'));
      return false;
    }

    if (parseInt(formData.year) < 1900 || parseInt(formData.year) > new Date().getFullYear() + 1) {
      alert(t('sellCar.validation.year'));
      return false;
    }

    if (parseInt(formData.price) <= 0) {
      alert(t('sellCar.validation.price'));
      return false;
    }

    return true;
  };

  if (success) {
    return (
      <SellCarContainer>
        <PageContainer>
          <SuccessMessage>
            <h3>{t('sellCar.success.title')}</h3>
            <p>{t('sellCar.success.message')}</p>
          </SuccessMessage>
        </PageContainer>
      </SellCarContainer>
    );
  }

  return (
    <SellCarContainer>
      <PageContainer>
        {/* Page Header */}
        <PageHeader>
          <h1>{t('sellCar.title')}</h1>
          <p>{t('sellCar.subtitle')}</p>
        </PageHeader>

        {/* Form */}
        <FormContainer>
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <FormSection>
              <h3>{t('sellCar.basicInfo')}</h3>
              <FormGrid>
                <FormGroup>
                  <label>{t('sellCar.make')} *</label>
                  <select name="make" value={formData.make} onChange={handleInputChange} required>
                    <option value="">{t('sellCar.selectMake')}</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Ford">Ford</option>
                    <option value="Opel">Opel</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.model')} *</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder={t('sellCar.modelPlaceholder')}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.year')} *</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="2020"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.mileage')}</label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    placeholder="150000"
                    min="0"
                  />
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.price')} *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="25000"
                    min="0"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.fuelType')}</label>
                  <select name="fuelType" value={formData.fuelType} onChange={handleInputChange}>
                    <option value="">{t('sellCar.selectFuelType')}</option>
                    <option value="petrol">{t('sellCar.fuelTypes.petrol')}</option>
                    <option value="diesel">{t('sellCar.fuelTypes.diesel')}</option>
                    <option value="electric">{t('sellCar.fuelTypes.electric')}</option>
                    <option value="hybrid">{t('sellCar.fuelTypes.hybrid')}</option>
                    <option value="gas">{t('sellCar.fuelTypes.gas')}</option>
                  </select>
                </FormGroup>
              </FormGrid>
            </FormSection>

            {/* Technical Details */}
            <FormSection>
              <h3>{t('sellCar.technicalDetails')}</h3>
              <FormGrid>
                <FormGroup>
                  <label>{t('sellCar.transmission')}</label>
                  <select name="transmission" value={formData.transmission} onChange={handleInputChange}>
                    <option value="">{t('sellCar.selectTransmission')}</option>
                    <option value="manual">{t('sellCar.transmissions.manual')}</option>
                    <option value="automatic">{t('sellCar.transmissions.automatic')}</option>
                    <option value="semi-automatic">{t('sellCar.transmissions.semiAutomatic')}</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.engineSize')}</label>
                  <input
                    type="number"
                    name="engineSize"
                    value={formData.engineSize}
                    onChange={handleInputChange}
                    placeholder="2000"
                    min="0"
                  />
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.power')}</label>
                  <input
                    type="number"
                    name="power"
                    value={formData.power}
                    onChange={handleInputChange}
                    placeholder="150"
                    min="0"
                  />
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.condition')}</label>
                  <select name="condition" value={formData.condition} onChange={handleInputChange}>
                    <option value="">{t('sellCar.selectCondition')}</option>
                    <option value="new">{t('sellCar.conditions.new')}</option>
                    <option value="used">{t('sellCar.conditions.used')}</option>
                    <option value="damaged">{t('sellCar.conditions.damaged')}</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.color')}</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder={t('sellCar.colorPlaceholder')}
                  />
                </FormGroup>
              </FormGrid>
            </FormSection>

            {/* Location */}
            <FormSection>
              <h3>{t('sellCar.location')}</h3>
              <FormGrid>
                <FormGroup>
                  <label>{t('sellCar.city')}</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder={t('sellCar.cityPlaceholder')}
                  />
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.region')}</label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    placeholder={t('sellCar.regionPlaceholder')}
                  />
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.postalCode')}</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="1000"
                  />
                </FormGroup>
              </FormGrid>
            </FormSection>

            {/* Description */}
            <FormSection>
              <h3>{t('sellCar.description')}</h3>
              <FormGroup>
                <label>{t('sellCar.title')}</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder={t('sellCar.titlePlaceholder')}
                />
              </FormGroup>

              <FormGroup>
                <label>{t('sellCar.description')}</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t('sellCar.descriptionPlaceholder')}
                  rows={4}
                />
              </FormGroup>

              {/* Features */}
              <FormGroup>
                <label>{t('sellCar.features')}</label>
                {formData.features.map((feature, index) => (
                  <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={t('sellCar.featurePlaceholder')}
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      style={{
                        background: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  style={{
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    cursor: 'pointer'
                  }}
                >
                  {t('sellCar.addFeature')}
                </button>
              </FormGroup>
            </FormSection>

            {/* Images */}
            <FormSection>
              <h3>{t('sellCar.images')}</h3>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <ImageUpload>
                  <span className="upload-icon">📷</span>
                  <div className="upload-text">{t('sellCar.uploadImages')}</div>
                  <div className="upload-hint">{t('sellCar.uploadHint')}</div>
                </ImageUpload>
              </label>

              {images.length > 0 && (
                <ImagePreview>
                  {images.map((image, index) => (
                    <ImageItem key={index}>
                      <img src={URL.createObjectURL(image)} alt={`Upload ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </button>
                    </ImageItem>
                  ))}
                </ImagePreview>
              )}
            </FormSection>

            {/* Bulgarian Specific */}
            <FormSection>
              <h3>{t('sellCar.bulgarianSpecific')}</h3>
              <CheckboxGroup>
                <input
                  type="checkbox"
                  name="hasBulgarianRegistration"
                  checked={formData.hasBulgarianRegistration}
                  onChange={handleCheckboxChange}
                  id="bulgarian-reg"
                />
                <label htmlFor="bulgarian-reg">{t('sellCar.hasBulgarianRegistration')}</label>
              </CheckboxGroup>

              <FormGrid>
                <FormGroup>
                  <label>{t('sellCar.vinNumber')}</label>
                  <input
                    type="text"
                    name="vinNumber"
                    value={formData.vinNumber}
                    onChange={handleInputChange}
                    placeholder={t('sellCar.vinPlaceholder')}
                  />
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.firstRegistrationDate')}</label>
                  <input
                    type="date"
                    name="firstRegistrationDate"
                    value={formData.firstRegistrationDate}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label>{t('sellCar.inspectionValidUntil')}</label>
                  <input
                    type="date"
                    name="inspectionValidUntil"
                    value={formData.inspectionValidUntil}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </FormGrid>
            </FormSection>

            {/* Form Actions */}
            <FormActions>
              <ActionButton type="button" variant="secondary" onClick={() => navigate('/cars')}>
                {t('common.cancel')}
              </ActionButton>
              <ActionButton type="submit" disabled={loading}>
                {loading ? t('common.loading') : t('sellCar.submit')}
              </ActionButton>
            </FormActions>
          </form>
        </FormContainer>
      </PageContainer>
    </SellCarContainer>
  );
};

export default SellCarPage;