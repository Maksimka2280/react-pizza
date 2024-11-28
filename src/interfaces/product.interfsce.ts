export interface Product {
    id: number;
    name: string;
    price: number;
    ingredients: string[]; // This should be a string, not an array
    image: string; // Ensure this is a string
    rating: number;
  }
  