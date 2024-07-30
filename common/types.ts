export type Recipe = {
    title: string;
    preamble: string[];
    ingredient_steps: IngredientStepInstru[];
  };
  type IngredientStepInstru =
    | {
        instruction: string;
        boxes?: DetailBox[];
      }
    | IngredientStep;
    export type IngredientStep = {
      amount: AmountInfo;
      ingredient: IngredientInfo;
    };;
  type AmountInfo = (
    | {
        weight: string;
      }
    | { volume: string }
  ) & { boxes?: DetailBox[] };
  
  type IngredientInfo = {
    name: string;
    post_span?: string;
    boxes?: DetailBox[];
  };
  
  type DetailBox = {
    type: string;
    text: string;
  };
  