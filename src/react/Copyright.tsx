import type { JSX } from "react";
import { Copyright as CopyrightCore } from "../copyright";
import type { CopyrightRenderOptions } from "../types";

/**
 * Props for the React Copyright component.
 */
export interface CopyrightProps extends CopyrightRenderOptions {
  /**
   * Element type to render.
   * React-specific alias for `tag`.
   *
   * @default 'span'
   */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * React component for displaying copyright notices.
 *
 * @param props - Component props
 * @returns A React element with the copyright text
 */
export function Copyright({
  owner,
  startYear,
  endYear,
  format,
  template,
  tag,
  as,
  className,
  style,
}: Readonly<CopyrightProps>): JSX.Element {
  const copyright = new CopyrightCore({
    owner,
    ...(startYear && { startYear }),
    ...(endYear && { endYear }),
    ...(format && { format }),
    ...(template && { template }),
  });

  const Element = as ?? tag ?? "span";
  const text = copyright.getText();

  return (
    <Element className={className} style={style}>
      {text}
    </Element>
  );
}
