import roughjs from "roughjs";
import * as React from "react";
import { useRef } from "react";
import { RoughSVG } from "roughjs/bin/svg";

export function RoughSvg({
  drawing,
  className,
  style,
  width,
  height,
}: Readonly<{
  className?: string;
  width: number;
  height: number;
  drawing: (svg: SVGSVGElement, rc: RoughSVG) => void;
  style: any;
}>) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      ref={(svg) => {
        if (!svg) {
          return;
        }
        while (svg.firstChild) svg.removeChild(svg.firstChild);
        const rc = roughjs.svg(svg);
        drawing(svg, rc);
      }}
    />
  );
}
