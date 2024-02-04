import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type VuesaxlinearsecuritySafeIconType = {
  dimensionCode?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propHeight?: CSSProperties["height"];
};

const VuesaxlinearsecuritySafeIcon: NextPage<
  VuesaxlinearsecuritySafeIconType
> = ({ dimensionCode, propWidth, propHeight }) => {
  const vuesaxlinearsecuritySafeIconStyle: CSSProperties = useMemo(() => {
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
      style={vuesaxlinearsecuritySafeIconStyle}
    />
  );
};

export default VuesaxlinearsecuritySafeIcon;
