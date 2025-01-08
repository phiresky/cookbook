export type Recipe = {
  title: string;
  main_picture: string;
  preamble: string[];
  ingredient_steps: IngredientStepInstru[];
};
export type IngredientStepInstru =
  | {
      instruction: string;
      boxes?: DetailBox[];
    }
  | IngredientStep;
export type IngredientStep = {
  amount: AmountInfo;
  ingredient: IngredientInfo;
};
type AmountInfo = (
  | {
      weight: string;
    }
  | { volume: string } | { count: string}
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
