import { classNames } from "@client/utils";

export const NumWrap = (digit: number) => {
  return (
    <span
      className={classNames(
        "px-1.5 py-0.5 rounded lining-nums slashed-zero ",
        "bg-black text-white"
      )}
    >
      {Intl.NumberFormat("en-US", {
        compactDisplay: "short",
        notation: "standard",
      }).format(digit)}
    </span>
  );
};
