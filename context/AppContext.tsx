'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, Currency, InspectionBooking } from '@/types/property';
import { INITIAL_PROPERTIES } from '@/data/properties';

interface AppContextType {
  // Properties
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  addProperty: (property: Property) => void;

  // Currency
  currency: Currency;
  setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
  toggleCurrency: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;

  // Property Details Modal
  selectedPropertyForModal: Property | null;
  openPropertyModal: (property: Property) => void;
  closePropertyModal: () => void;

  // Inspection Modal
  selectedPropertyForInspection: Property | null;
  isInspectionOpen: boolean;
  openInspection: (property?: Property) => void;
  closeInspection: () => void;

  // Mortgage Calculator Modal
  selectedPropertyForCalculator: Property | null;
  isCalculatorOpen: boolean;
  openCalculator: (property?: Property) => void;
  closeCalculator: () => void;

  // List Property Modal
  isListPropertyOpen: boolean;
  openListProperty: () => void;
  closeListProperty: () => void;

  // AI Advisor Modal
  isAiAdvisorOpen: boolean;
  openAiAdvisor: () => void;
  closeAiAdvisor: () => void;

  // Favorites Drawer
  isFavoritesOpen: boolean;
  openFavorites: () => void;
  closeFavorites: () => void;

  // Notification Toast
  notification: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [favorites, setFavorites] = useState<string[]>(['kbr-001', 'kbr-003']);

  // Modals
  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState<Property | null>(null);
  const [selectedPropertyForInspection, setSelectedPropertyForInspection] = useState<Property | null>(null);
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [selectedPropertyForCalculator, setSelectedPropertyForCalculator] = useState<Property | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  // Load preferences from localStorage safely without triggering cascading renders
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      try {
        const savedCurrency = localStorage.getItem('kam_currency') as Currency;
        if (savedCurrency === 'USD' || savedCurrency === 'NLE') {
          setCurrency(savedCurrency);
        }
        const savedFavs = localStorage.getItem('kam_favorites');
        if (savedFavs) {
          setFavorites(JSON.parse(savedFavs));
        }
      } catch (e) {
        console.error('Error loading stored preferences:', e);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleCurrency = () => {
    setCurrency((prev) => {
      const next = prev === 'USD' ? 'NLE' : 'USD';
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('kam_currency', next);
        } catch {}
      }
      return next;
    });
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('kam_favorites', JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  };

  const addProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
    showNotification(`Property "${newProp.title}" listed successfully!`);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  // Modal helpers
  const openPropertyModal = (property: Property) => setSelectedPropertyForModal(property);
  const closePropertyModal = () => setSelectedPropertyForModal(null);

  const openInspection = (property?: Property) => {
    setSelectedPropertyForInspection(property || null);
    setIsInspectionOpen(true);
  };
  const closeInspection = () => {
    setIsInspectionOpen(false);
    setSelectedPropertyForInspection(null);
  };

  const openCalculator = (property?: Property) => {
    setSelectedPropertyForCalculator(property || null);
    setIsCalculatorOpen(true);
  };
  const closeCalculator = () => {
    setIsCalculatorOpen(false);
    setSelectedPropertyForCalculator(null);
  };

  const openListProperty = () => setIsListPropertyOpen(true);
  const closeListProperty = () => setIsListPropertyOpen(false);

  const openAiAdvisor = () => setIsAiAdvisorOpen(true);
  const closeAiAdvisor = () => setIsAiAdvisorOpen(false);

  const openFavorites = () => setIsFavoritesOpen(true);
  const closeFavorites = () => setIsFavoritesOpen(false);

  return (
    <AppContext.Provider
      value={{
        properties,
        setProperties,
        addProperty,
        currency,
        setCurrency,
        toggleCurrency,
        favorites,
        toggleFavorite,
        selectedPropertyForModal,
        openPropertyModal,
        closePropertyModal,
        selectedPropertyForInspection,
        isInspectionOpen,
        openInspection,
        closeInspection,
        selectedPropertyForCalculator,
        isCalculatorOpen,
        openCalculator,
        closeCalculator,
        isListPropertyOpen,
        openListProperty,
        closeListProperty,
        isAiAdvisorOpen,
        openAiAdvisor,
        closeAiAdvisor,
        isFavoritesOpen,
        openFavorites,
        closeFavorites,
        notification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
