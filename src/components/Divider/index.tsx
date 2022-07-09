import { useMemo } from "react";

export const VerticalDivider = () => {
  return useMemo(() => {
    return (
      <div
        className="h-100 border-left border-secondary bg-secondary m-auto"
        style={{
          width: "1px",
        }}
      ></div>
    );
  }, []);
};
