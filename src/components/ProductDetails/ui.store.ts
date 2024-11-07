import { create } from 'zustand';

type UIState = {
	lightboxStatus: boolean;
};

type UIActions = {
	setLightboxStatus: (toggle: boolean | ((s: boolean) => boolean)) => void;
};

type InitUIStore = UIState & UIActions;

export const useUIStore = create<InitUIStore>((set, get) => ({
	lightboxStatus: false,
	setLightboxStatus: toggle =>
		set({
			lightboxStatus: typeof toggle === 'boolean' ? toggle : toggle(get().lightboxStatus)
		})
}));
