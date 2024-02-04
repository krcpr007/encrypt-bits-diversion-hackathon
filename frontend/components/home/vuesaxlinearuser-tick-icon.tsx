import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type VuesaxlinearuserTickIconType = {
  dimensionLabel?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propHeight?: CSSProperties["height"];
};

const VuesaxlinearuserTickIcon: NextPage<VuesaxlinearuserTickIconType> = ({
  dimensionLabel,
  propWidth,
  propHeight,
}) => {
  const vuesaxlinearuserTickIconStyle: CSSProperties = useMemo(() => {
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
      style={vuesaxlinearuserTickIconStyle}
    />
  );
};

export default VuesaxlinearuserTickIcon;
