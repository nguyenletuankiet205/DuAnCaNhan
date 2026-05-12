"use client";

import { create } from "zustand";

type ModalName = "lead-detail" | "media-preview" | "delete-confirm" | null;

type UiState = {
  mobileMenuOpen: boolean;
  dashboardSidebarOpen: boolean;
  activeModal: ModalName;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setDashboardSidebarOpen: (open: boolean) => void;
  toggleDashboardSidebar: () => void;
  setActiveModal: (modal: ModalName) => void;
};

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  dashboardSidebarOpen: true,
  activeModal: null,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setDashboardSidebarOpen: (open) => set({ dashboardSidebarOpen: open }),
  toggleDashboardSidebar: () => set((state) => ({ dashboardSidebarOpen: !state.dashboardSidebarOpen })),
  setActiveModal: (modal) => set({ activeModal: modal })
}));
