import { getRecipeBySlug } from "@/common/recipes";
import { ShowRecipe } from "@/components/ShowRecipe";
import Head from "next/head";

export function generateStaticParams() {
  return [{ slug: "tasty-meaty-soy-crumbs" }];
}

export default function Page(props: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(props.params.slug);
  if (!recipe) {
    return <div>Recipe not found.</div>;
  }
  return (
    <>
      <Head>
        <title>{recipe.title}</title>
      </Head>
      <ShowRecipe recipe={recipe} />
    </>
  );
}
