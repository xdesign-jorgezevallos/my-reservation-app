export interface DishState {
  id?: number;
  name: string;
  description?: string;
  price: string;
}

export interface Dish {
  dishes: DishState[];
}
