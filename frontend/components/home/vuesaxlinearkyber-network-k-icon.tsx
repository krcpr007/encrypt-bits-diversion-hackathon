import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type VuesaxlinearkyberNetworkKIconType = {
  dimension?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propHeight?: CSSProperties["height"];
};

const VuesaxlinearkyberNetworkKIcon: NextPage<
  VuesaxlinearkyberNetworkKIconType
> = ({ dimension, propWidth, propHeight }) => {
  const vuesaxlinearkyberNetworkKIconStyle: CSSProperties = useMemo(() => {
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
      style={vuesaxlinearkyberNetworkKIconStyle}
    />
  );
};

export default VuesaxlinearkyberNetworkKIcon;
