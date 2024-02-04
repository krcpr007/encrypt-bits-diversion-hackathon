import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type VuesaxlinearglobalIconType = {
  dimensionCode?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propHeight?: CSSProperties["height"];
};

const VuesaxlinearglobalIcon: NextPage<VuesaxlinearglobalIconType> = ({
  dimensionCode,
  propWidth,
  propHeight,
}) => {
  const vuesaxlinearglobalIconStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      height: propHeight,
    };
  }, [propWidth, propHeight]);

  return (
    <img
      className="w-[3.81rem] relative h-[3.81rem]"
      alt=""
      src={dimensionCode}
      style={vuesaxlinearglobalIconStyle}
    />
  );
};

export default VuesaxlinearglobalIcon;
