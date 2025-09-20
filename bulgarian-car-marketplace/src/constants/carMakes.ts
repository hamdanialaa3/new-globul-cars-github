// src/constants/carMakes.ts
// Comprehensive Car Makes List for Bulgarian Car Marketplace
// قائمة شاملة لماركات السيارات لسوق السيارات البلغاري

export const CAR_MAKES = [
  'ABT', 'AC Schnitzer', 'Abarth', 'Acura', 'Alfa Romeo', 'Alpina', 'Alpine', 'Apex', 'Arrinera', 'Artega',
  'Ascari', 'Aston Martin', 'Audi', 'BAC', 'BAIC', 'Bentley', 'Bertone', 'BMW', 'Borgward', 'Brabham',
  'Brabus', 'Breckland', 'Brilliance', 'Bugatti', 'Buick', 'BYD', 'Cadillac', 'Caparo', 'Carlsson', 'Caterham',
  'Changan', 'Chery', 'Chevrolet', 'Chrysler', 'Citroën', 'Covini', 'Cupra', 'Czinger', 'Dacia', 'Daewoo',
  'Daihatsu', 'Daimler', 'Datsun', 'De Tomaso', 'Devon', 'Dodge', 'Donkervoort', 'Dongfeng', 'DS Automobiles', 'EDAG',
  'Edo', 'Elfin', 'Eterniti', 'Exeed', 'FM Auto', 'FPV', 'Farbio', 'Ferrari', 'Fiat', 'Fisker', 'Ford',
  'Forthing', 'GAZ', 'Geely', 'Genesis', 'GMC', 'Gordon Murray', 'Great Wall', 'GTA', 'Gumpert', 'Haval',
  'Hamann', 'Hennessey', 'Holden', 'Honda', 'Hongqi', 'HSV', 'Hummer', 'Hyundai', 'Icona', 'Infiniti',
  'Iran Khodro', 'Isuzu', 'Italdesign', 'Iveco', 'JAC', 'Jaguar', 'Jeep', 'Jetour', 'KTM', 'Karma',
  'Kia', 'Kleemann', 'Koenigsegg', 'LCC', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Larte', 'Leapmotor',
  'Leblanc', 'Lexus', 'Lincoln', 'Lobini', 'Loremo', 'Lotus', 'Lucid Motors', 'Lynk Co', 'MAN', 'Mahindra',
  'Mansory', 'Marcos', 'Maserati', 'Maxus', 'Maybach', 'Mazda', 'Mazel', 'McLaren', 'Mercedes-Benz', 'Mercury',
  'MG', 'Mindset', 'Mini', 'Mitsubishi', 'Mitsuoka', 'Morgan', 'Moskvitch', 'NanoFlowcell', 'Nilu', 'NIO',
  'Nismo', 'Nissan', 'Noble', 'Oldsmobile', 'Opel', 'ORCA', 'Pagani', 'Panoz', 'Peugeot', 'PGO',
  'Pininfarina', 'Plymouth', 'Polestar', 'Pontiac', 'Porsche', 'Praga', 'Proton', 'Qoros', 'RAM', 'Renault',
  'Rimac', 'Rinspeed', 'Rivian', 'Rolls-Royce', 'Rover', 'Saab', 'Saipa', 'Saleen', 'Saturn', 'Scania',
  'Scion', 'Scout', 'SEAT', 'Seres', 'Sin Cars', 'Singer', 'Skoda', 'Slate', 'Smart', 'Sony',
  'Spada', 'Spyker', 'SsangYong', 'Startech', 'Stola', 'Strosek', 'StudioTorino', 'Subaru', 'Suzuki', 'Tata',
  'Tatra', 'TechArt', 'Tesla', 'Think', 'Touring', 'Toyota', 'Tramontana', 'TVR', 'TWR', 'UAZ',
  'Valmet', 'Vauxhall', 'Venturi', 'VinFast', 'Volkswagen', 'Volvo', 'Voyah', 'Vuhl', 'Wald', 'Wiesmann',
  'Xpeng', 'Yes', 'Zagato', 'Zeekr', 'Zenvo'
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