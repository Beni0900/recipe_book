export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

export interface Instruction {
  id: string;
  description: string;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}
