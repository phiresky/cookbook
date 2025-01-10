export type Recipe = {
  title: string;
  main_picture: string;
  preamble: string[];
  ingredient_steps: IngredientStepInstru[];
};
export type IngredientStepInstru =
  | {
      instruction: string;
      post_span?: string;
      detail?: StepDetail
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
) & {detail?: StepDetail };

type StepDetail = {
  text?: string
  detailButton?: string;
  detailText?: {title?: string, text: string}[];
};
type IngredientInfo = {
  name: string;
  post_span?: string;
  detail?: StepDetail
};

type DetailBox = {
  type: string;
  text: string;
};
