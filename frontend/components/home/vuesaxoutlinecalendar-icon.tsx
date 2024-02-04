import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type VuesaxoutlinecalendarIconType = {
  dimension?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propHeight?: CSSProperties["height"];
};

const VuesaxoutlinecalendarIcon: NextPage<VuesaxoutlinecalendarIconType> = ({
  dimension,
  propWidth,
  propHeight,
}) => {
  const vuesaxoutlinecalendarIconStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      height: propHeight,
    };
  }, [propWidth, propHeight]);

  return (
    <img
      className="w-[3.81rem] relative h-[3.81rem]"
      alt=""
      src={dimension}
      style={vuesaxoutlinecalendarIconStyle}
    />
  );
};

export default VuesaxoutlinecalendarIcon;
