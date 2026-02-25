export type RecipeTag = "Meat" | "Fish" | "Spicy" | "Chicken" | "Kid friendly";

export interface RecipeListItem {
  id: string;
  title: string;
  image: string;
  tags: RecipeTag[];
  recipeTypeId: string; // ID string from API
}

export interface RecipeDetails extends RecipeListItem {
  author: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  calories: number;
  totalMinutes: number;
}

export interface RecipeType {
  id: string;
  name: string;
}
