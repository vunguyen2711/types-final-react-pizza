import { Dispatch, SetStateAction } from "react";
import { number, string } from "yup";

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
  amount?: number;
  totalPrice?: number;
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
export type FormValues = {
  fullname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
};
export type FormCheckOutValue = {
  name: string;
  phone: string;
  address: string;
  transport: string;
};

export type GetDataOrder = number;
export type getDetailThunkOrder = string | undefined;
export type deleteThunkOrder = string | number | undefined;
export interface PostDataOrder {
  id?: number;
  userId: number;
  cartItems: FetchData[];
  timeInit: string;
  completed: boolean;
  totalPrice: number;
  deliveryData?: FormCheckOutValue;
  amount?: number;
}
export interface OrderState {
  status: "idle" | "loading" | "success" | "failed";
  statusDelete: "idle" | "loading" | "success" | "failed";
  ordersByUser: PostDataOrder[];
  ordersByDetail?: PostDataOrder | undefined;
}

export interface CommentThunkState {
  comments: CommentThunkData[];
  status: "idle" | "loading" | "success" | "failed";
  error: string;
}
export interface CommentThunkData {
  comment: string;
  userId: number;
  name: string;
  email: string;
  productId: string | number;
  time: string;
  rate: number;
  id?: number;
}
export interface CommentForm {
  comment: string;
}
export interface CommentProps {
  productID: string;
}
export interface GetCommentThunkParams {
  limit?: number;
  page?: number;
  rateValue?: number;
  userId?: undefined;
  productId: string;
}
export interface CommentItemsProps {
  data: CommentThunkData;
  filterParams: GetCommentThunkParams;
}
export interface ContactFormValidation {
  name: string;
  phone: string | number;
  email: string;
  content: string;
}
export interface ContactThunkParams {
  name: string;
  phone: string | number;
  email: string;
  content: string;
}

export interface ContactState {
  status: "idle" | "loading" | "success" | "failed";
}

export interface BookMarkProps {
  idItem: number;
}
export interface CreateInitialFavoriteParams {
  id: number | string;
  favoriteIds: number[];
  favoriteProducts?: ProductCartItems[];
}
export interface ChangeFavoritePrams {
  id: number | string;
  favoriteIds: number[];
}
export type ToggleFavoritePayLoadAction = number;

export interface GetByIdObject {
  status: "idle" | "loading" | "success" | "failed";
  favoriteData?: CreateInitialFavoriteParams;
}
export interface CreateInitialObject {
  status: "idle" | "loading" | "success" | "failed";
}
export interface ChangeFavoriteObject {
  status: "idle" | "loading" | "success" | "failed";
}
export interface FavoriteState {
  getByIdState: GetByIdObject;
  createInitialForUser: CreateInitialObject;
  changeFavorite: ChangeFavoriteObject;
}
export type GetFavoriteProductsParams = number[];
