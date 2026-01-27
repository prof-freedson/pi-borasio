import { useState } from 'react';

export function useRuralRouteSelection() {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [routeReserved, setRouteReserved] = useState<number | null>(null);

  const handleCitySelect = (cityName: string, routes: any[]) => {
    setSelectedCity(cityName);
    const route = routes.find(r => r.origin === cityName);
    if (route) {
      setSelectedRoute(route.id);
    }
  };

  const handleReserveRoute = (routeId: number) => {
    setRouteReserved(routeId);
  };

  const handleGoToRides = (routes: any[]) => {
    if (routeReserved) {
      const route = routes.find(r => r.id === routeReserved);
      if (route) {
        localStorage.setItem('selectedRuralRoute', JSON.stringify(route));
        window.location.href = '/corridas?tipo=rural';
      }
    }
  };

  return {
    selectedRoute,
    selectedCity,
    routeReserved,
    setSelectedRoute,
    setSelectedCity,
    setRouteReserved,
    handleCitySelect,
    handleReserveRoute,
    handleGoToRides
  };
}
