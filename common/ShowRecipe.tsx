"use client";

import { Fragment, useCallback, useRef, useState } from "react";
import { IngredientStep, Recipe } from "./types";
import { RoughSvg } from "./RoughSvg";
import { handwriting } from "@/app/fonts";
import { RoughSVG } from "roughjs/bin/svg";

export function ShowRecipe({ recipe }: { recipe: Recipe }) {
  return (
    <div className="mx-auto max-w-lg mt-6">
      <h1 className="text-xl mb-3">{recipe.title}</h1>
      {recipe.preamble.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <hr />
      <div className="grid grid-cols-[1fr_3fr] gap-1">
        {recipe.ingredient_steps.map((step, i) => {
          if ("ingredient" in step) {
            return <Ingredient key={i} step={step} />;
          }
          return (
            <Fragment key={i}>
              <div />
              <div key={i} className="">
                <p className="text-gray-700">{step.instruction}</p>
              </div>
            </Fragment>
          );
        })}
      </div>
      <hr />
      <button className="rounded bg-yellow-500 px-3 py-2 m-2">
        Share / Save ingredients only
      </button>
      <button className="rounded bg-yellow-500 px-3 py-2 m-2">
        Share recipe
      </button>
    </div>
  );
}

function Ingredient({ step }: { step: IngredientStep }) {
  const [ingredientName, setIngredientName] = useState<DOMRect>();
  const [ingredientBox, setIngredientBox] = useState<DOMRect>();
  const drawing = useCallback(
    (svg: SVGSVGElement, rc: RoughSVG) => {
      if (!ingredientName || !ingredientBox) return;
      svg.appendChild(
        rc.line(
          ingredientName.right,
          ingredientName.y + ingredientName.height / 2,
          ingredientBox.left,
          ingredientBox.y + ingredientBox.height / 2,
          { roughness: 2, stroke: "black" }
        )
      );
    },
    [ingredientName, ingredientBox]
  );

  return (
    <>
      <div className="text-right">
        {"weight" in step.amount ? step.amount.weight : step.amount.volume}
      </div>
      <div>
        <RoughSvg
          className="absolute overflow-visible"
          style={{top: 0, left: 0}}
          drawing={drawing}
        />
        <span
          ref={(r) => {
            if (ingredientName) return;
            if (r) setIngredientName(r.getBoundingClientRect());
          }}
        >
          {step.ingredient.name}
        </span>
        {step.ingredient.post_span || ""}
        <div className="relative">
        <div
          className={`${handwriting.className} text-2xl absolute bg-gray-200 p-2 rounded top-0 left-full w-96 h-12 overflow-scroll`}
          ref={r => {
            if(ingredientBox) return;
            if(r) setIngredientBox(r.getBoundingClientRect());
          }}
        >
          {step.ingredient.boxes?.map((box, j) => (
            <button key={j} className="inline rounded bg-gray-400 m-1 p-1">
              {box.type}
            </button>
          ))}
        </div></div>
      </div>
    </>
  );
}
