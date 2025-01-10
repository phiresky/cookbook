import { getRecipeBySlug } from "@/common/recipes";
import { ShowRecipe } from "@/components/ShowRecipe";
import { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";

export function generateStaticParams() {
  return [{ slug: "tasty-meaty-soy-crumbs" }];
}
 
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) {
    return { title: "Recipe not found" };
  }
  return { title: recipe.title };

}

export default function Page(props: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(props.params.slug);
  if (!recipe) {
    return <div>Recipe not found.</div>;
  }
  return (
    <>
      <ShowRecipe recipe={recipe} />
    </>
  );
}
