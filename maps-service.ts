

// Google Maps Platform Integration for Bulgarian Car Marketplace

/// <reference types="@types/google.maps" />

import { Loader } from '@googlemaps/js-api-loader';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

const apiKey = process.env.GOOGLE_MAPS_API_KEY || 'your-google-maps-api-key';

const loader = new Loader({
  apiKey,
  version: 'weekly',
  libraries: ['places']
});

export class BulgarianMapsService {
  // Load map library
  async loadMap(elementId: string, options: google.maps.MapOptions): Promise<google.maps.Map> {
    const google = await loader.load();
    const mapElement = document.getElementById(elementId) as HTMLElement;
    const map = new google.maps.Map(mapElement, options);
    return map;
  }

  // Add marker to map
  addMarker(map: google.maps.Map, position: google.maps.LatLngLiteral, title?: string): google.maps.Marker {
    return new google.maps.Marker({
      position,
      map,
      title: title || null
    });
  }

  // Calculate distance between two points
  getDistance(origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = origin.lat * Math.PI/180;
    const φ2 = destination.lat * Math.PI/180;
    const Δφ = (destination.lat-origin.lat) * Math.PI/180;
    const Δλ = (destination.lng-origin.lng) * Math.PI/180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in meters
  }

  // Fetch locations from Firestore and display on map
  async showLocationsOnMap(map: google.maps.Map, collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.lat && data.lng && data.name) {
        this.addMarker(map, { lat: data.lat, lng: data.lng }, data.name);
      }
    });
  }
}

// Usage example
// const mapsService = new BulgarianMapsService();
// await mapsService.loadMap('map', { center: { lat: 42.7, lng: 23.3 }, zoom: 10 });
// mapsService.addMarker(map, { lat: 42.7, lng: 23.3 }, 'Car for Sale');
// await mapsService.showLocationsOnMap(map, 'dealers'); // Display all dealers
