"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IngredientStep, Recipe, IngredientStepInstru } from "../common/types";
import { RoughSvg } from "./RoughSvg";
import { handwriting } from "@/app/fonts";
import { RoughSVG } from "roughjs/bin/svg";
import Image from "next/image";
import { useHintBoxDrawing } from "./drawing";

type BoxVal = Partial<{
  rightTarget: DOMRect;
  leftTarget: DOMRect;
  rightDetail: DOMRect;
  leftDetail: DOMRect;
}>;
export class BoxStorage {
  ingredients = new Map<IngredientStepInstru, BoxVal>();
  set(ingredient: IngredientStepInstru, val: BoxVal) {
    this.ingredients.set(ingredient, {
      ...(this.ingredients.get(ingredient) ?? {}),
      ...val,
    });
  }
}
type RecipeShowMode = "half-blood-prince" | "popups";

export function ShowRecipe({ recipe }: { recipe: Recipe }) {
  const [ingredientBoxes] = useState(new BoxStorage());

  const { drawing, redraw } = useHintBoxDrawing(ingredientBoxes);
  const [hintBoxYStart, setHintBoxYStart] = useState<number | null>(null);
  const [popup, setPopup] = useState<{
    step: IngredientStepInstru;
    type: DetailType;
  } | null>(null);
  const mode: RecipeShowMode = "popups";
  function showDetailPopup(i: IngredientStepInstru, t: DetailType) {
    setPopup({ step: i, type: t });
  }
  if (mode === "popups") {
    return (
      <>
        {popup && (
          <div className="fixed bg-white border-2 border-black m-1 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-20">
            <button className={`float-right ${handwriting.className} underline m-1`} onClick={() => setPopup(null)}>Close</button>
            <HintBox
              step={popup.step}
              setBoxLoc={() => {}}
              redraw={() => {}}
              type={popup.type}
            />
          </div>
        )}
        <div className="mx-auto ">
          <IngredientMain
            {...{
              recipe,
              redraw,
              setHintBoxYStart,
              ingredientBoxes,
              showDetailPopup,
            }}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="mx-auto grid"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        <div className="max-w-sm mt-10 justify-self-end">
          <div style={{ height: hintBoxYStart + "px" }} />
          <HintBoxes
            recipe={recipe}
            type="amount"
            setBoxLoc={(a, b) => ingredientBoxes.set(a, { leftDetail: b })}
            redraw={redraw}
          />
        </div>
        <IngredientMain
          {...{
            recipe,
            redraw,
            setHintBoxYStart,
            ingredientBoxes,
            showDetailPopup,
          }}
        />
        <div className="max-w-sm mt-10">
          <div style={{ height: hintBoxYStart + "px" }} />
          <HintBoxes
            recipe={recipe}
            type="ingredient"
            setBoxLoc={(a, b) => ingredientBoxes.set(a, { rightDetail: b })}
            redraw={redraw}
          />
        </div>
        <RoughSvg
          className="absolute overflow-visible top-0 left-0 pointer-events-none"
          drawing={drawing}
        />
      </div>
    </>
  );
}

function IngredientMain({
  recipe,
  redraw,
  setHintBoxYStart,
  ingredientBoxes,
  showDetailPopup,
}: {
  recipe: Recipe;
  redraw: () => void;
  setHintBoxYStart: (n: number) => void;
  ingredientBoxes: BoxStorage;
  showDetailPopup: (step: IngredientStepInstru, t: DetailType) => void;
}) {
  return (
    <div className="max-w-lg mt-6 mx-auto px-2">
      <h1 className="text-xl mb-3">{recipe.title}</h1>
      <img src={recipe.main_picture} onLoad={redraw} />
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
        {recipe.ingredient_steps.map((step, i) => (
          <IngredientOrStep
            key={i}
            step={step}
            ingredientBoxes={ingredientBoxes}
            showDetailPopup={(t) => showDetailPopup(step, t)}
          />
        ))}
      </div>
      <hr />
      {/*<button className="rounded bg-yellow-500 px-3 py-2 m-2">
          Share / Save ingredients only
        </button>
        <button className="rounded bg-yellow-500 px-3 py-2 m-2">
          Share recipe
        </button>*/}
    </div>
  );
}
function IngredientOrStep({
  step,
  ingredientBoxes,
  showDetailPopup,
}: {
  step: IngredientStepInstru;
  ingredientBoxes: BoxStorage;
  showDetailPopup: (t: DetailType) => void;
}) {
  if ("ingredient" in step) {
    return (
      <Ingredient
        step={step}
        boxes={ingredientBoxes}
        showDetailPopup={showDetailPopup}
      />
    );
  }
  return (
    <Fragment>
      <div />
      <div className="z-10">
        <p className={`text-gray-700`}>
          <span
            className={`bg-white  ${step.detail ? "underline cursor-pointer" : ""}`}
            onClick={() => step.detail && showDetailPopup("amount")}
            ref={(e) => {
              e &&
                ingredientBoxes.set(step, {
                  leftTarget: e.getBoundingClientRect(),
                });
            }}
          >
            {step.instruction}{step.detail && " 🛈"}
          </span>{step.post_span}
        </p>
      </div>
    </Fragment>
  );
}
type DetailType = "ingredient" | "amount";
function HintBoxes({
  recipe,
  setBoxLoc,
  redraw,
  type,
}: {
  recipe: Recipe;
  setBoxLoc: (ingredient: IngredientStepInstru, boxLoc: DOMRect) => void;
  redraw: () => void;
  type: DetailType;
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
  const detail =
  "ingredient" in step
  ? step[type].detail
  : type === "amount"
  ? step.detail
  : null;
  const [visibleBox, setVisibleBox] = useState<boolean>(!detail?.text);
  if (!detail) return <></>;
  return (
    <div
      className={`${handwriting.className} bg-white p-2 left-full w-80 overflow-scroll mb-2 text-gray-600`}
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
          <Fragment key={j}>
            <h3 className={`underline ${"text-black"}`}>
              {box.title}
            </h3>
            {box.text}
          </Fragment>
        ))}
    </div>
  );
}

function Ingredient({
  step,
  boxes,
  showDetailPopup,
}: {
  step: IngredientStep;
  boxes: BoxStorage;
  showDetailPopup: (type: DetailType) => void;
}) {
  return (
    <>
      <div className="text-right z-10">
        <span
          className={`bg-white font-bold ${
            step.amount.detail ? "underline cursor-pointer" : ""
          }`}
          onClick={() => step.amount.detail && showDetailPopup("amount")}
          ref={(e) => {
            e && boxes.set(step, { leftTarget: e.getBoundingClientRect() });
          }}
        >
          {step.amount.detail && "🛈"}{" "}
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
            className={`bg-white font-bold ${
              step.ingredient.detail ? "underline cursor-pointer" : ""
            }`}
            onClick={() => step.ingredient.detail && showDetailPopup("ingredient")}
            ref={(e) => {
              e && boxes.set(step, { rightTarget: e.getBoundingClientRect() });
            }}
          >
            {step.ingredient.name} {step.ingredient.detail && "🛈"}
          </span>
          <span className="text-gray-700 bg-white">
            {step.ingredient.post_span || ""}
          </span>
        </div>
      </div>
    </>
  );
}
