"use client";

import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IngredientStep, Recipe, IngredientStepInstru } from "../common/types";
import { RoughSvg } from "./RoughSvg";
import { handwriting } from "@/app/fonts";
import { RoughSVG } from "roughjs/bin/svg";

type BoxVal = Partial<{
  name: DOMRect;
  amount: DOMRect;
  rightDetail: DOMRect;
  leftDetail: DOMRect;
}>;
class BoxStorage {
  ingredients = new Map<IngredientStepInstru, BoxVal>();
  set(ingredient: IngredientStepInstru, val: BoxVal) {
    this.ingredients.set(ingredient, {
      ...(this.ingredients.get(ingredient) ?? {}),
      ...val,
    });
  }
}
export function ShowRecipe({ recipe }: { recipe: Recipe }) {
  const [ingredientBoxes] = useState(new BoxStorage());
  const [drawingCounter, setDrawingCounter] = useState(0);

  const [drawing, setDrawing] = useState<
    (svg: SVGSVGElement, rc: RoughSVG) => void
  >(() => () => {});
  useLayoutEffect(
    () =>
      setDrawing(() => (svg: SVGSVGElement, rc: RoughSVG) => {
        for (const [ingredient, boxes] of ingredientBoxes.ingredients) {
          {
            // right box
            const box = boxes.name;
            const detailBox = boxes.rightDetail;
            if (!box || !detailBox) continue;
            const color = "gray";
            svg.appendChild(
              rc.line(
                box.right + 10,
                box.y + box.height / 2,
                detailBox.left,
                detailBox.y + detailBox.height / 2,
                { roughness: 2, stroke: color, disableMultiStroke: true }
              )
            );
            svg.appendChild(
              rc.rectangle(
                detailBox.x,
                detailBox.y,
                detailBox.width,
                detailBox.height,
                { stroke: color }
              )
            );
          }
          {
            // left box
            const box = boxes.amount;
            const detailBox = boxes.leftDetail;
            if (!box || !detailBox) continue;
            const color = "gray";
            // draw from left of amount to right of detail
            svg.appendChild(
              rc.line(
                box.left,
                box.y + box.height / 2,
                detailBox.right,
                detailBox.y + detailBox.height / 2,
                { roughness: 2, stroke: color, disableMultiStroke: true }
              )
            );
            svg.appendChild(
              rc.rectangle(
                detailBox.x,
                detailBox.y,
                detailBox.width,
                detailBox.height,
                { stroke: color }
              )
            );
          }
        }
      }),
    [drawingCounter]
  );

  return (
    <div
      className="mx-auto grid"
      style={{ gridTemplateColumns: "1fr auto 1fr" }}
    >
      <div className="max-w-sm mt-10">
      <HintBoxes
          recipe={recipe}
          type="amount"
          setBoxLoc={(a, b) => ingredientBoxes.set(a, { leftDetail: b })}
          redraw={() => setDrawingCounter((c) => c + 1)}
        />
      </div>
      <div className="max-w-lg mt-6 mx-auto">
        <h1 className="text-xl mb-3">{recipe.title}</h1>
        {recipe.preamble.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <hr />
        <div className="grid grid-cols-[1fr_3fr] gap-x-2">
          {recipe.ingredient_steps.map((step, i) => {
            if ("ingredient" in step) {
              return (
                <Ingredient key={i} step={step} i={i} boxes={ingredientBoxes} />
              );
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
      <div className="max-w-sm mt-10">
        <HintBoxes
          recipe={recipe}
          type="ingredient"
          setBoxLoc={(a, b) => ingredientBoxes.set(a, { rightDetail: b })}
          redraw={() => setDrawingCounter((c) => c + 1)}
        />
      </div>
      <RoughSvg
        className="absolute overflow-visible top-0 left-0 pointer-events-none"
        drawing={drawing}
      />
    </div>
  );
}

function HintBoxes({
  recipe,
  setBoxLoc,
  redraw,
  type,
}: {
  recipe: Recipe;
  setBoxLoc: (ingredient: IngredientStepInstru, boxLoc: DOMRect) => void;
  redraw: () => void;
  type: "ingredient" | "amount"
}) {
  return (
    <>
      {recipe.ingredient_steps.map((step, i) => (
        <HintBox step={step} key={i} setBoxLoc={setBoxLoc} redraw={redraw} type={type} />
      ))}
    </>
  );
}
function HintBox({
  step,
  setBoxLoc,
  redraw,
  type,
}: {
  step: IngredientStepInstru;
  setBoxLoc: (ingredient: IngredientStepInstru, boxLoc: DOMRect) => void;
  redraw: () => void;
  type: "ingredient" | "amount"
}) {
  const [visibleBox, setVisibleBox] = useState<string | null>("Considerations");
  const boxes = "ingredient" in step ? step[type].boxes : null;
  if (!boxes) return <></>;
  return (
    <div
      className={`${handwriting.className} bg-white p-2 left-full w-96 overflow-scroll mb-2`}
      ref={(e) => {
        e && setBoxLoc(step, e.getBoundingClientRect());
      }}
    >
      {boxes.map((box, j) => (
        <button
          key={j}
          className={`inline m-1 p-1 underline ${
            box.type === visibleBox ? "text-black" : "text-gray-500"
          }`}
          onClick={() => {
            setVisibleBox(visibleBox === box.type ? null : box.type);
            redraw();
          }}
        >
          {box.type}
        </button>
      ))}
      <div>{visibleBox && boxes.find((b) => b.type === visibleBox)?.text}</div>
    </div>
  );
}

function Ingredient({
  step,
  i,
  boxes,
}: {
  step: IngredientStep;
  i: number;
  boxes: BoxStorage;
}) {
  return (
    <>
      <div className="text-right">
        <span
          ref={(e) => {
            e && boxes.set(step, { amount: e.getBoundingClientRect() });
          }}
        >
          {"weight" in step.amount ? step.amount.weight : step.amount.volume}
        </span>
      </div>
      <div>
        <div className="relative">
          <span
            ref={(e) => {
              e && boxes.set(step, { name: e.getBoundingClientRect() });
            }}
          >
            {step.ingredient.name}
          </span>
          {step.ingredient.post_span || ""}
        </div>
      </div>
    </>
  );
}
