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
import Image from "next/image";

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
                window.scrollY + box.y + box.height / 2,
                detailBox.left,
                window.scrollY + detailBox.y + detailBox.height / 2,
                { roughness: 2, stroke: color, disableMultiStroke: true }
              )
            );
            svg.appendChild(
              rc.rectangle(
                detailBox.x,
                window.scrollY + detailBox.y,
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
                window.scrollY + box.y + box.height / 2,
                detailBox.right,
                window.scrollY + detailBox.y + detailBox.height / 2,
                { roughness: 2, stroke: color, disableMultiStroke: true }
              )
            );
            svg.appendChild(
              rc.rectangle(
                detailBox.x,
                window.scrollY + detailBox.y,
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
  const [hintBoxYStart, setHintBoxYStart] = useState<number | null>(null);

  return (
    <div
      className="mx-auto grid"
      style={{ gridTemplateColumns: "1fr auto 1fr" }}
    >
      <div className="max-w-sm mt-10">
        <div style={{ height: hintBoxYStart + "px" }} />
        <HintBoxes
          recipe={recipe}
          type="amount"
          setBoxLoc={(a, b) => ingredientBoxes.set(a, { leftDetail: b })}
          redraw={() => setDrawingCounter((c) => c + 1)}
        />
      </div>
      <div className="max-w-lg mt-6 mx-auto">
        <h1 className="text-xl mb-3">{recipe.title}</h1>
        <img src={recipe.main_picture} alt="Picture of soy crumbs" />
        {recipe.preamble.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <hr />
        <div
          className="grid grid-cols-[1fr_3fr] gap-x-2"
          ref={(d) =>
            setHintBoxYStart(
              window.scrollY + (d?.getBoundingClientRect().top ?? 0) - 100
            )
          }
        >
          {recipe.ingredient_steps.map((step, i) => {
            if ("ingredient" in step) {
              return (
                <Ingredient key={i} step={step} i={i} boxes={ingredientBoxes} />
              );
            }
            return (
              <Fragment key={i}>
                <div />
                <div key={i} className="z-10">
                  <p className="text-gray-700">
                    <span className="bg-white">{step.instruction}</span>
                  </p>
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
        <div style={{ height: hintBoxYStart + "px" }} />
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
  type: "ingredient" | "amount";
}) {
  return (
    <>
      {recipe.ingredient_steps.map((step, i) => (
        <HintBox
          step={step}
          key={i}
          setBoxLoc={setBoxLoc}
          redraw={redraw}
          type={type}
        />
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
  type: "ingredient" | "amount";
}) {
  const [visibleBox, setVisibleBox] = useState<boolean>(false);
  const detail = "ingredient" in step ? step[type].detail : (type ==="amount" ? step.detail : null);
  if (!detail) return <></>;
  return (
    <div
      className={`${handwriting.className} bg-white p-2 left-full w-96 overflow-scroll mb-2 text-gray-600`}
      ref={(e) => {
        e && setBoxLoc(step, e.getBoundingClientRect());
      }}
    >
      {detail.text}
      {detail.detailButton && (
        <button
          className="underline"
          onClick={() => {
            setVisibleBox(!visibleBox);
            redraw();
          }}
        >
          {visibleBox ? "▲" : "▼"} {detail.detailButton}
        </button>
      )}
      {visibleBox &&
        detail.detailText?.map((box, j) => (
          <><h3
            key={j}
            className={`underline ${"text-black"}`}
          >
            {box.title}
          </h3>
          {box.text}</>
        ))}
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
      <div className="text-right z-10">
        <span
          className="bg-white"
          ref={(e) => {
            e && boxes.set(step, { amount: e.getBoundingClientRect() });
          }}
        >
          {"weight" in step.amount
            ? step.amount.weight
            : "count" in step.amount
            ? step.amount.count
            : step.amount.volume}
        </span>
      </div>
      <div>
        <div className="relative z-10">
          <span
            className="bg-white"
            ref={(e) => {
              e && boxes.set(step, { name: e.getBoundingClientRect() });
            }}
          >
            {step.ingredient.name}
          </span>
          <span className="text-gray-700 bg-white">
            {step.ingredient.post_span || ""}
          </span>
        </div>
      </div>
    </>
  );
}
