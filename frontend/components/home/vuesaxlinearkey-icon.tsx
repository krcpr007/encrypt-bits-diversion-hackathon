import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type VuesaxlinearkeyIconType = {
  dimensionLabel?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propHeight?: CSSProperties["height"];
};

const VuesaxlinearkeyIcon: NextPage<VuesaxlinearkeyIconType> = ({
  dimensionLabel,
  propWidth,
  propHeight,
}) => {
  const vuesaxlinearkeyIconStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      height: propHeight,
    };
  }, [propWidth, propHeight]);

  return (
    <img
      className="w-[3.81rem] relative h-[3.81rem]"
      alt=""
      src={dimensionLabel}
      style={vuesaxlinearkeyIconStyle}
    />
  );
};

export default VuesaxlinearkeyIcon;
