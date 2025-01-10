import { useEffect, useLayoutEffect, useState } from "react";
import { RoughSVG } from "roughjs/bin/svg";
import { BoxStorage } from "./ShowRecipe";

export function useHintBoxDrawing(ingredientBoxes: BoxStorage) {
  const [drawingCounter, setDrawingCounter] = useState(0);

  const [drawing, setDrawing] = useState<
    (svg: SVGSVGElement, rc: RoughSVG) => void
  >(() => () => {});
  useLayoutEffect(
    () =>
      setDrawing(() => (svg: SVGSVGElement, rc: RoughSVG) => {
        for (const [ingredient, boxes] of ingredientBoxes.ingredients) {
          function drawRightBox() {
            {
              // right box
              const box = boxes.rightTarget;
              const detailBox = boxes.rightDetail;
              if (!box || !detailBox) return;
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
          }

          function drawLeftBox() {
            // left box
            const box = boxes.leftTarget;
            const detailBox = boxes.leftDetail;
            console.log("drawing left", ingredient, boxes);
            if (!box || !detailBox) return;
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
          drawRightBox();
          drawLeftBox();
        }
      }),
    [drawingCounter]
  );
  useEffect(() => {
    const listener = () => setDrawingCounter((c) => c + 1);
    // redraw on resize
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);
  return { drawing, redraw: () => setDrawingCounter((c) => c + 1) };
}
