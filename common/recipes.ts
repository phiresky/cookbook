import soy_crumbs from "./soy-crumbs";
import { Recipe } from "./types";

export function getRecipeBySlug(slug: string): Recipe | undefined {
    return {
        "tasty-meaty-soy-crumbs": soy_crumbs
    }[slug];
}