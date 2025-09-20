// src/constants/carMakes.ts
// Comprehensive Car Makes List for Bulgarian Car Marketplace
// قائمة شاملة لماركات السيارات لسوق السيارات البلغاري

export const CAR_MAKES = [
  'Abarth', 'Acura', 'Alfa Romeo', 'Alpine', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Brilliance', 'Bugatti',
  'Buick', 'BYD', 'Cadillac', 'Changan', 'Chery', 'Chevrolet', 'Chrysler', 'Citroën', 'Cupra', 'Dacia',
  'Daewoo', 'Daihatsu', 'Dodge', 'Dongfeng', 'DS Automobiles', 'Exeed', 'Ferrari', 'Fiat', 'Fisker', 'Ford',
  'Forthing', 'GAZ', 'Geely', 'Genesis', 'GMC', 'Great Wall', 'Haval', 'Honda', 'Hongqi', 'Hummer',
  'Hyundai', 'Infiniti', 'Iran Khodro', 'Isuzu', 'Iveco', 'Jaguar', 'JAC', 'Jeep', 'Jetour', 'Kia',
  'Koenigsegg', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Leapmotor', 'Lexus', 'Lincoln', 'Lotus', 'Lucid Motors',
  'MAN', 'Mahindra', 'Maserati', 'Maxus', 'Maybach', 'Mazda', 'McLaren', 'Mercedes-Benz', 'MG', 'Mini',
  'Mitsubishi', 'Moskvitch', 'NIO', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 'Polestar', 'Pontiac', 'Porsche',
  'Praga', 'RAM', 'Renault', 'Rimac', 'Rinspeed', 'Rolls-Royce', 'Rover', 'Saab', 'Saipa', 'Scania',
  'SEAT', 'Seres', 'Sin Cars', 'Skoda', 'Smart', 'SsangYong', 'Subaru', 'Suzuki', 'Tata', 'Tesla',
  'Toyota', 'Tatra', 'TVR', 'UAZ', 'Volkswagen', 'Volvo', 'Voyah', 'Wiesmann', 'Xpeng', 'Zeekr'
];

// Generate years array from 1900 to 2025
export const YEARS_OPTIONS = (() => {
  const years = [];
  for (let year = 2025; year >= 1900; year--) {
    years.push(year);
  }
  return years;
})();

// Price suggestions for Bulgarian market
export const PRICE_SUGGESTIONS = [
  1000, 2000, 3000, 5000, 7000, 10000, 15000, 20000, 25000, 30000,
  35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000, 100000, 150000
];

// Fuel types
export const FUEL_TYPES = [
  'petrol', 'diesel', 'electric', 'hybrid', 'gas', 'lpg', 'cng', 
  'hydrogen', 'ethanol', 'biodiesel', 'other'
];

// Transmission types
export const TRANSMISSION_TYPES = [
  'manual', 'automatic', 'semiAutomatic'
];

// Car conditions
export const CAR_CONDITIONS = [
  'excellent', 'veryGood', 'good', 'fair', 'poor'
];

// Car colors
export const CAR_COLORS = [
  'white', 'black', 'silver', 'gray', 'blue', 'red', 'green', 
  'yellow', 'orange', 'brown', 'purple', 'other'
];

// Default export
const carConstants = {
  CAR_MAKES,
  YEARS_OPTIONS,
  PRICE_SUGGESTIONS,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  CAR_CONDITIONS,
  CAR_COLORS
};

export default carConstants;