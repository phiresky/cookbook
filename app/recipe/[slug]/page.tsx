import { getRecipeBySlug } from "@/common/recipes";
import { ShowRecipe } from "@/common/ShowRecipe";

export function generateStaticParams() {
  return [{ slug: "tasty-meaty-soy-crumbs" }];
}

export default function Page(props: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(props.params.slug);
  if (!recipe) {
    return <div>Recipe not found.</div>;
  }
  return (
    <ShowRecipe recipe={recipe} />
  );
}
