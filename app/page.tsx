import Image from "next/image";
import { generateStaticParams } from "./recipe/[slug]/page";
import { getRecipeBySlug } from "@/common/recipes";

export default function Home() {
  return ( // centered flex with 3 items per row
    <div className="flex flex-wrap justify-center">
      {generateStaticParams().map((params) => {
        const recipe = getRecipeBySlug(params.slug);
        console.log(!!recipe)
        if (!recipe) return null;
        return <a
          key={params.slug}
          href={`/recipe/${params.slug}`}
          className="relative w-80 h-80 overflow-hidden rounded-lg shadow-lg"
        >
          <Image
            src={`/recipe/${recipe.main_picture}`}
            alt="picture"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <h2 className="text-white text-2xl font-semibold">
              {recipe.title}
            </h2>
          </div>
        </a>;
      })}
    </div>
  );
}
