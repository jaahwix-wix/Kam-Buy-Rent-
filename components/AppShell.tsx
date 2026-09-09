'use client';

import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { LeftSidebarNav } from '@/components/LeftSidebarNav';
import { Footer } from '@/components/Footer';
import { PropertyModal } from '@/components/PropertyModal';
import { FavoritesDrawer } from '@/components/FavoritesDrawer';
import { InspectionModal } from '@/components/InspectionModal';
import { MortgageCalculatorModal } from '@/components/MortgageCalculatorModal';
import { ListPropertyModal } from '@/components/ListPropertyModal';
import { AiPropertyAdvisor } from '@/components/AiPropertyAdvisor';
import { CheckCircle2 } from 'lucide-react';

function AppShellContent({ children }: { children: React.ReactNode }) {
  const {
    properties,
    currency,
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
    addProperty,
    isAiAdvisorOpen,
    openAiAdvisor,
    closeAiAdvisor,
    isFavoritesOpen,
    openFavorites,
    closeFavorites,
    notification,
    showNotification,
  } = useApp();

  const favoritedProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Global Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-medium text-slate-200">{notification}</p>
        </div>
      )}

      {/* Main Menu at the Left Hand Side of the System */}
      <LeftSidebarNav
        currency={currency}
        onCurrencyToggle={toggleCurrency}
        favoritesCount={favorites.length}
        onOpenFavorites={openFavorites}
        onOpenListProperty={openListProperty}
        onOpenScheduleGeneral={() => openInspection()}
        onOpenAiAdvisor={openAiAdvisor}
      />

      {/* Right Content Pane: Main View + Global Footer */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <main className="flex-1">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </div>

      {/* Global Modals */}
      {selectedPropertyForModal && (
        <PropertyModal
          property={selectedPropertyForModal}
          currency={currency}
          isFavorite={favorites.includes(selectedPropertyForModal.id)}
          onToggleFavorite={toggleFavorite}
          onClose={closePropertyModal}
          onBookInspection={(p) => {
            closePropertyModal();
            openInspection(p);
          }}
          onOpenCalculator={(p) => {
            closePropertyModal();
            openCalculator(p);
          }}
        />
      )}

      {isFavoritesOpen && (
        <FavoritesDrawer
          isOpen={isFavoritesOpen}
          onClose={closeFavorites}
          favorites={favoritedProperties}
          currency={currency}
          onRemoveFavorite={toggleFavorite}
          onSelectProperty={(p) => {
            closeFavorites();
            openPropertyModal(p);
          }}
        />
      )}

      {isInspectionOpen && (
        <InspectionModal
          property={selectedPropertyForInspection}
          onClose={closeInspection}
          onConfirmBooking={(booking) => {
            closeInspection();
            showNotification(
              `Viewing tour scheduled for ${booking.clientName} (${booking.type === 'diaspora-video' ? 'Diaspora Live Video' : 'In-Person'})! Agent desk notified.`
            );
          }}
        />
      )}

      {isCalculatorOpen && (
        <MortgageCalculatorModal
          property={selectedPropertyForCalculator}
          currency={currency}
          onClose={closeCalculator}
        />
      )}

      {isListPropertyOpen && (
        <ListPropertyModal
          onClose={closeListProperty}
          onAddProperty={(newProp) => {
            addProperty(newProp);
            closeListProperty();
          }}
        />
      )}

      {isAiAdvisorOpen && (
        <AiPropertyAdvisor
          isOpen={isAiAdvisorOpen}
          onClose={closeAiAdvisor}
          currentProperty={selectedPropertyForModal}
          onSelectPropertyId={(id) => {
            const found = properties.find((p) => p.id === id);
            if (found) {
              openPropertyModal(found);
            }
          }}
        />
      )}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AppShellContent>{children}</AppShellContent>
    </AppProvider>
  );
}
