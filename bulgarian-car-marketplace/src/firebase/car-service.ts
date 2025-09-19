// src/firebase/car-service.ts
// Bulgarian Car Service for Car Marketplace

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  DocumentSnapshot
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';
import { db, storage, BulgarianFirebaseUtils } from './firebase-config';

// Car Condition Types
export type CarCondition = 'new' | 'used' | 'damaged';

// Fuel Types
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'gas';

// Transmission Types
export type TransmissionType = 'manual' | 'automatic' | 'semi-automatic';

// Bulgarian Car Interface
export interface BulgarianCar {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone?: string;

  // Basic Information
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  currency: string;

  // Technical Details
  fuelType: FuelType;
  transmission: TransmissionType;
  engineSize: number; // in cubic centimeters
  power: number; // in horsepower
  condition: CarCondition;

  // Location
  location: {
    city: string;
    region: string;
    postalCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };

  // Description
  title: string;
  description: string;
  features: string[];
  color: string;

  // Media
  images: string[]; // URLs to Firebase Storage
  mainImage: string;

  // Status
  isActive: boolean;
  isSold: boolean;
  isFeatured: boolean;
  views: number;
  favorites: number;

  // Bulgarian Specific
  hasBulgarianRegistration: boolean;
  vinNumber?: string;
  firstRegistrationDate?: Date;
  inspectionValidUntil?: Date;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastViewedAt?: Date;
}

// Car Search Filters
export interface CarSearchFilters {
  make?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  maxMileage?: number;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  condition?: CarCondition;
  location?: {
    city?: string;
    region?: string;
    radius?: number; // in kilometers
  };
  features?: string[];
  keywords?: string;
  hasImages?: boolean;
  isActive?: boolean;
  isSold?: boolean;
}

// Bulgarian Car Service
export class BulgarianCarService {
  private static instance: BulgarianCarService;

  private constructor() {}

  static getInstance(): BulgarianCarService {
    if (!BulgarianCarService.instance) {
      BulgarianCarService.instance = new BulgarianCarService();
    }
    return BulgarianCarService.instance;
  }

  // Create a new car listing
  async createCarListing(carData: Omit<BulgarianCar, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'favorites'>): Promise<string> {
    try {
      // Validate car data
      this.validateCarData(carData);

      // Create car object
      const car: Omit<BulgarianCar, 'id'> = {
        ...carData,
        views: 0,
        favorites: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'cars'), {
        ...car,
        createdAt: Timestamp.fromDate(car.createdAt),
        updatedAt: Timestamp.fromDate(car.updatedAt),
        firstRegistrationDate: car.firstRegistrationDate ? Timestamp.fromDate(car.firstRegistrationDate) : null,
        inspectionValidUntil: car.inspectionValidUntil ? Timestamp.fromDate(car.inspectionValidUntil) : null
      });

      return docRef.id;
    } catch (error: any) {
      throw this.handleCarError(error);
    }
  }

  // Update car listing
  async updateCarListing(carId: string, updates: Partial<BulgarianCar>, ownerId: string): Promise<void> {
    try {
      // Verify ownership
      await this.verifyCarOwnership(carId, ownerId);

      // Validate updates
      if (updates.price !== undefined) {
        this.validatePrice(updates.price);
      }

      if (updates.location?.postalCode) {
        if (!BulgarianFirebaseUtils.validateBulgarianPostalCode(updates.location.postalCode)) {
          throw new Error('Невалиден пощенски код');
        }
      }

      // Update Firestore
      await updateDoc(doc(db, 'cars', carId), {
        ...updates,
        updatedAt: Timestamp.fromDate(new Date())
      });
    } catch (error: any) {
      throw this.handleCarError(error);
    }
  }

  // Delete car listing
  async deleteCarListing(carId: string, ownerId: string): Promise<void> {
    try {
      // Verify ownership
      await this.verifyCarOwnership(carId, ownerId);

      // Delete associated images
      await this.deleteCarImages(carId);

      // Delete from Firestore
      await deleteDoc(doc(db, 'cars', carId));
    } catch (error: any) {
      throw this.handleCarError(error);
    }
  }

  // Get car by ID
  async getCarById(carId: string): Promise<BulgarianCar | null> {
    try {
      const carDoc = await getDoc(doc(db, 'cars', carId));

      if (!carDoc.exists()) {
        return null;
      }

      const data = carDoc.data();
      return {
        id: carDoc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        firstRegistrationDate: data.firstRegistrationDate?.toDate(),
        inspectionValidUntil: data.inspectionValidUntil?.toDate(),
        lastViewedAt: data.lastViewedAt?.toDate()
      } as BulgarianCar;
    } catch (error: any) {
      throw this.handleCarError(error);
    }
  }

  // Search cars with filters
  async searchCars(
    filters: CarSearchFilters = {},
    sortBy: 'createdAt' | 'price' | 'mileage' | 'year' = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    limitCount: number = 20,
    startAfterDoc?: DocumentSnapshot
  ): Promise<{ cars: BulgarianCar[]; hasMore: boolean; lastDoc?: DocumentSnapshot }> {
    try {
      let q = query(collection(db, 'cars'));

      // Apply filters
      if (filters.make) {
        q = query(q, where('make', '==', filters.make));
      }

      if (filters.model) {
        q = query(q, where('model', '==', filters.model));
      }

      if (filters.fuelType) {
        q = query(q, where('fuelType', '==', filters.fuelType));
      }

      if (filters.transmission) {
        q = query(q, where('transmission', '==', filters.transmission));
      }

      if (filters.condition) {
        q = query(q, where('condition', '==', filters.condition));
      }

      if (filters.isActive !== undefined) {
        q = query(q, where('isActive', '==', filters.isActive));
      }

      if (filters.isSold !== undefined) {
        q = query(q, where('isSold', '==', filters.isSold));
      }

      if (filters.hasImages !== undefined) {
        if (filters.hasImages) {
          q = query(q, where('images', '!=', []));
        } else {
          q = query(q, where('images', '==', []));
        }
      }

      // Apply sorting
      q = query(q, orderBy(sortBy, sortOrder));

      // Apply pagination
      if (startAfterDoc) {
        q = query(q, startAfter(startAfterDoc));
      }

      q = query(q, limit(limitCount + 1)); // +1 to check if there are more results

      const querySnapshot = await getDocs(q);
      const cars: BulgarianCar[] = [];
      let lastDoc: DocumentSnapshot | undefined;

      const docs = querySnapshot.docs;
      for (let i = 0; i < docs.length && i < limitCount; i++) {
        const doc = docs[i];
        const data = doc.data();
        const car = {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          firstRegistrationDate: data.firstRegistrationDate?.toDate(),
          inspectionValidUntil: data.inspectionValidUntil?.toDate(),
          lastViewedAt: data.lastViewedAt?.toDate()
        } as BulgarianCar;

        // Apply client-side filters that Firestore doesn't support directly
        if (this.matchesAdvancedFilters(car, filters)) {
          cars.push(car);
          lastDoc = doc;
        }
      }

      const hasMore = querySnapshot.size > limitCount;

      return { cars, hasMore, lastDoc };
    } catch (error: any) {
      throw this.handleCarError(error);
    }
  }

  // Check if car matches advanced filters (client-side filtering)
  private matchesAdvancedFilters(car: BulgarianCar, filters: CarSearchFilters): boolean {
    // Price range
    if (filters.minPrice !== undefined && car.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && car.price > filters.maxPrice) {
      return false;
    }

    // Year range
    if (filters.minYear !== undefined && car.year < filters.minYear) {
      return false;
    }
    if (filters.maxYear !== undefined && car.year > filters.maxYear) {
      return false;
    }

    // Max mileage
    if (filters.maxMileage !== undefined && car.mileage > filters.maxMileage) {
      return false;
    }

    // Location
    if (filters.location?.city && car.location.city !== filters.location.city) {
      return false;
    }
    if (filters.location?.region && car.location.region !== filters.location.region) {
      return false;
    }

    // Features
    if (filters.features && filters.features.length > 0) {
      const hasAllFeatures = filters.features.every(feature =>
        car.features.includes(feature)
      );
      if (!hasAllFeatures) {
        return false;
      }
    }

    // Keywords search
    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase();
      const searchableText = [
        car.title,
        car.description,
        car.make,
        car.model,
        car.location.city,
        car.location.region,
        ...car.features
      ].join(' ').toLowerCase();

      if (!searchableText.includes(keywords)) {
        return false;
      }
    }

    return true;
  }

  // Get user's car listings
  async getUserCarListings(userId: string, includeInactive: boolean = false): Promise<BulgarianCar[]> {
    try {
      let q = query(
        collection(db, 'cars'),
        where('ownerId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      if (!includeInactive) {
        q = query(q, where('isActive', '==', true));
      }

      const querySnapshot = await getDocs(q);
      const cars: BulgarianCar[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        cars.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          firstRegistrationDate: data.firstRegistrationDate?.toDate(),
          inspectionValidUntil: data.inspectionValidUntil?.toDate(),
          lastViewedAt: data.lastViewedAt?.toDate()
        } as BulgarianCar);
      });

      return cars;
    } catch (error: any) {
      throw this.handleCarError(error);
    }
  }

  // Upload car images
  async uploadCarImages(carId: string, files: File[]): Promise<string[]> {
    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length && i < 10; i++) { // Max 10 images
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`Файл ${file.name} не е изображение`);
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`Файл ${file.name} е твърде голям (максимум 5MB)`);
        }

        // Create storage reference
        const storageRef = ref(storage, `cars/${carId}/${Date.now()}_${file.name}`);

        // Upload file
        await uploadBytes(storageRef, file);

        // Get download URL
        const downloadURL = await getDownloadURL(storageRef);
        uploadedUrls.push(downloadURL);
      }

      return uploadedUrls;
    } catch (error: any) {
      throw this.handleCarError(error);
    }
  }

  // Delete car images
  async deleteCarImages(carId: string): Promise<void> {
    try {
      const imagesRef = ref(storage, `cars/${carId}`);
      const imagesList = await listAll(imagesRef);

      // Delete all images
      const deletePromises = imagesList.items.map((itemRef) => deleteObject(itemRef));
      await Promise.all(deletePromises);
    } catch (error: any) {
      console.error('Error deleting car images:', error);
    }
  }

  // Mark car as viewed
  async markCarAsViewed(carId: string): Promise<void> {
    try {
      const carRef = doc(db, 'cars', carId);
      await updateDoc(carRef, {
        views: (await getDoc(carRef)).data()?.views + 1 || 1,
        lastViewedAt: Timestamp.fromDate(new Date())
      });
    } catch (error: any) {
      console.error('Error marking car as viewed:', error);
    }
  }

  // Toggle favorite status
  async toggleFavorite(carId: string, userId: string): Promise<boolean> {
    try {
      const favoriteRef = doc(db, 'favorites', `${userId}_${carId}`);
      const favoriteDoc = await getDoc(favoriteRef);

      if (favoriteDoc.exists()) {
        // Remove favorite
        await deleteDoc(favoriteRef);

        // Decrease favorite count
        await updateDoc(doc(db, 'cars', carId), {
          favorites: (await getDoc(doc(db, 'cars', carId))).data()?.favorites - 1 || 0
        });

        return false; // Not favorite anymore
      } else {
        // Add favorite
        await addDoc(collection(db, 'favorites'), {
          userId,
          carId,
          createdAt: Timestamp.fromDate(new Date())
        });

        // Increase favorite count
        await updateDoc(doc(db, 'cars', carId), {
          favorites: (await getDoc(doc(db, 'cars', carId))).data()?.favorites + 1 || 1
        });

        return true; // Now favorite
      }
    } catch (error: any) {
      throw this.handleCarError(error);
    }
  }

  // Get user's favorite cars
  async getUserFavoriteCars(userId: string): Promise<BulgarianCar[]> {
    try {
      const favoritesQuery = query(
        collection(db, 'favorites'),
        where('userId', '==', userId)
      );

      const favoritesSnapshot = await getDocs(favoritesQuery);
      const carIds: string[] = [];

      favoritesSnapshot.forEach((doc) => {
        carIds.push(doc.data().carId);
      });

      // Get car details
      const cars: BulgarianCar[] = [];
      for (const carId of carIds) {
        const car = await this.getCarById(carId);
        if (car) {
          cars.push(car);
        }
      }

      return cars;
    } catch (error: any) {
      throw this.handleCarError(error);
    }
  }

  // Get popular cars
  async getPopularCars(limitCount: number = 10): Promise<BulgarianCar[]> {
    try {
      const q = query(
        collection(db, 'cars'),
        where('isActive', '==', true),
        where('isSold', '==', false),
        orderBy('views', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const cars: BulgarianCar[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        cars.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          firstRegistrationDate: data.firstRegistrationDate?.toDate(),
          inspectionValidUntil: data.inspectionValidUntil?.toDate(),
          lastViewedAt: data.lastViewedAt?.toDate()
        } as BulgarianCar);
      });

      return cars;
    } catch (error: any) {
      throw this.handleCarError(error);
    }
  }

  // Private helper methods
  private validateCarData(carData: Omit<BulgarianCar, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'favorites'>): void {
    if (!carData.make || !carData.model) {
      throw new Error('Марка и модел на автомобила са задължителни');
    }

    if (carData.year < 1900 || carData.year > new Date().getFullYear() + 1) {
      throw new Error('Невалидна година на производство');
    }

    this.validatePrice(carData.price);

    if (carData.mileage < 0) {
      throw new Error('Километражът не може да бъде отрицателен');
    }

    if (!carData.location.city || !carData.location.region) {
      throw new Error('Град и област са задължителни');
    }

    if (!BulgarianFirebaseUtils.validateBulgarianPostalCode(carData.location.postalCode)) {
      throw new Error('Невалиден пощенски код');
    }

    if (!carData.title || carData.title.length < 10) {
      throw new Error('Заглавието трябва да бъде поне 10 символа');
    }

    if (!carData.description || carData.description.length < 50) {
      throw new Error('Описанието трябва да бъде поне 50 символа');
    }
  }

  private validatePrice(price: number): void {
    if (price <= 0) {
      throw new Error('Цената трябва да бъде положително число');
    }

    if (price > 10000000) { // 10 million BGN
      throw new Error('Цената е твърде висока');
    }
  }

  private async verifyCarOwnership(carId: string, ownerId: string): Promise<void> {
    const car = await this.getCarById(carId);
    if (!car) {
      throw new Error('Автомобилът не е намерен');
    }

    if (car.ownerId !== ownerId) {
      throw new Error('Нямате права да редактирате този автомобил');
    }
  }

  private handleCarError(error: any): Error {
    const errorMessages: { [key: string]: string } = {
      'permission-denied': 'Нямате права за достъп до този автомобил',
      'not-found': 'Автомобилът не е намерен',
      'invalid-argument': 'Невалидни данни за автомобила',
      'resource-exhausted': 'Твърде много заявки. Моля опитайте по-късно',
      'internal': 'Вътрешна грешка в системата',
      'storage/unauthorized': 'Нямате права да качвате файлове',
      'storage/canceled': 'Качването беше отменено',
      'storage/quota-exceeded': 'Надхвърлен е лимитът за съхранение',
      'storage/invalid-format': 'Невалиден формат на файла'
    };

    const bulgarianMessage = errorMessages[error.code] || 'Възникна грешка при обработката на автомобила';
    return new Error(bulgarianMessage);
  }
}

// Export singleton instance
export const bulgarianCarService = BulgarianCarService.getInstance();