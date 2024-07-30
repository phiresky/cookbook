"use client";

import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IngredientStep, Recipe } from "../common/types";
import { RoughSvg } from "./RoughSvg";
import { handwriting } from "@/app/fonts";
import { RoughSVG } from "roughjs/bin/svg";

export function ShowRecipe({ recipe }: { recipe: Recipe }) {
  return (
    <div className="mx-auto grid grid-cols-[1fr_3fr_1fr]">
      <div className="max-w-sm">[left margin]</div>
      <div className="max-w-lg mt-6">
      <h1 className="text-xl mb-3">{recipe.title}</h1>
      {recipe.preamble.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <hr />
      <div className="grid grid-cols-[1fr_3fr] gap-x-2">
        {recipe.ingredient_steps.map((step, i) => {
          if ("ingredient" in step) {
            return <Ingredient key={i} step={step} i={i} />;
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
      <div className="max-w-sm">right margin</div>
    </div>
  );
}

function Ingredient({ step, i }: { step: IngredientStep, i: number }) {
  const ingredientNameRef = useRef<HTMLSpanElement>(null);
  const ingredientBoxRef = useRef<HTMLDivElement>(null);

  const [visibleBox, setVisibleBox] = useState<string | null>(null);
  const [drawing, setDrawing] = useState<
    (svg: SVGSVGElement, rc: RoughSVG) => void
  >(() => () => {});
  useLayoutEffect(
    () =>
      setDrawing(() => (svg: SVGSVGElement, rc: RoughSVG) => {
        if (!ingredientNameRef.current || !ingredientBoxRef.current) return;
        const ingredientName =
          ingredientNameRef.current.getBoundingClientRect();
        const ingredientBox = ingredientBoxRef.current.getBoundingClientRect();
        const color = "gray";
        svg.appendChild(
          rc.line(
            ingredientName.right + 10,
            ingredientName.y + ingredientName.height / 2,
            ingredientBox.left,
            ingredientBox.y + ingredientBox.height / 2,
            { roughness: 2, stroke: color, disableMultiStroke: true }
          )
        );
        svg.appendChild(
          rc.rectangle(
            ingredientBox.x,
            ingredientBox.y,
            ingredientBox.width,
            ingredientBox.height,
            { stroke: color }
          )
        );
      }),
    []
  );

  return (
    <>
      <div className="text-right">
        {"weight" in step.amount ? step.amount.weight : step.amount.volume}
      </div>
      <div>
        <div className="relative">
          <span ref={ingredientNameRef}>{step.ingredient.name}</span>
          {step.ingredient.post_span || ""}
          <div
            className={`${handwriting.className} bg-white text-2xl absolute p-2 left-full w-96 overflow-scroll -translate-y-1/2`}
            style={{top: (i-4) * 1 + "rem"}}
            ref={ingredientBoxRef}
          >
            {step.ingredient.boxes?.map((box, j) => (
              <button
                key={j}
                className={`inline m-1 p-1 underline ${box.type === visibleBox ? "text-black" : "text-gray-500"}`}
                onClick={() =>
                  setVisibleBox(visibleBox === box.type ? null : box.type)
                }
              >
                {box.type}
              </button>
            ))}
            <div>
            {visibleBox &&
              step.ingredient.boxes?.find((b) => b.type === visibleBox)?.text}</div>
          </div>
        </div>
        <RoughSvg
          className="absolute overflow-visible top-0 left-0"
          drawing={drawing}
        />
      </div>
    </>
  );
}
