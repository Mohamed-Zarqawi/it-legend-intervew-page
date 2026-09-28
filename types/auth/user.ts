export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  phoneCode?: string;
  // cart: {
  //   id: number;
  //   product: ProductType;
  //   quantity: number;
  // }[];
  // favorite: { productId: number }[];
  // favorite_items: FavoriteItem[];
  birthday?: string;
  gender?: "male" | "female";
  // orders: OrderType[];
  // addresses: AddressType[];
  role?: string;
  is_blocked: boolean;
  // orders_number: string;
  // favorites_number: number;
  created_at: string;
};
