export type ApiTagValue = boolean | number | string | null;

export interface ApiTag {
  key: string;
  value: ApiTagValue;
}

export interface ApiRecipeListItem {
  _id: string;
  title: string;
  image: string;
  recipeType: string;
  tags: ApiTag[];
}

export interface ApiRecipeType {
  _id: string;
  name: string;
}

export interface ApiIngredient {
  ingredient: string;
}

export interface ApiInstruction {
  step: number;
  description: string;
}

export interface ApiRecipeDetails extends ApiRecipeListItem {
  author?: string;
  description?: string;
  ingredients?: ApiIngredient[];
  instructions?: ApiInstruction[];
}
