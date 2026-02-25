export type RecipeTag = "Meat" | "Fish" | "Spicy" | "Chicken" | "Kid friendly";
export type RecipeCategory =
  | "All"
  | "Appetizers"
  | "Starters"
  | "Main Courses"
  | "Side Dishes"
  | "Desserts";

export interface RecipeListItem {
  id: string;
  title: string;
  image: string;
  tags: RecipeTag[];
  category: RecipeCategory; // TODO not sure if this is correct
}

export interface RecipeDetails extends RecipeListItem {
  author: string;
  description: string;
  ingredients: string[];
  instructions: string[];

  // TODO not sure if this is correct
  calories: number;
  totalMinutes: number;
}

export interface RecipeType {
  id: string;
  title: string;
}
