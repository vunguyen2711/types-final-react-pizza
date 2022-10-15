export interface IsOpenProps {
  isOpen: boolean;
}
export interface HelmetProps {
  title: string;
}
export interface CommonProps {
  title: string;
}
export interface ProductCartItems {
  category: string;
  id: number;
  img: string;
  price: number;
  title: string;
}
export interface FetchData {
  id: number;
  title: string;
  price: number;
  img: string;
  category: string;
  type?: string;
}
export interface OptionState {
  type?: string | null;
  limit: number;
}
export interface Loading {
  comboLoading: boolean;
  pizzaLoading: boolean;
  appetizersLoading: boolean;
  noodlesLoading: boolean;
  saladsLoading: boolean;
  drinksLoading: boolean;
  creamsLoading: boolean;
}
export interface LoadMore {
  pizzas: boolean | null;
  appetizers: boolean | null;
  noodles: boolean | null;
  salads: boolean | null;
  drinks: boolean | null;
  creams: boolean | null;
}

export interface IconSliderProps {
  max: number;
  min: number;
}
export type SliderValue = number | [number, number];
export type ValueSelect = string;
