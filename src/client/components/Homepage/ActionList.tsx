import {
  ArrowCircleRightIcon,
  CheckIcon,
  CurrencyDollarIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { NumWrap } from "./NumWrap";

export default function ActionList({ success }: { success: boolean }) {
  return (
    <div className="px-6 py-5 flex flex-col gap-y-3 text-sm font-light cursor-[default]">
      {actions.map((e, i: number) => (
        <div key={i} className="w-full flex items-center gap-x-2.5">
          {e.icon}
          <span className="flex-1">{e.content}</span>
          {success && <CheckIcon className="w-5 text-emerald-500" />}
        </div>
      ))}
    </div>
  );
}

const actions = [
  {
    icon: <CurrencyDollarIcon className="w-5 opacity-40 text-amber-200" />,
    content: <>Mint {NumWrap(1000)} ERC20 tokens to Alice</>,
  },
  {
    icon: <CurrencyDollarIcon className="w-5 opacity-40 text-amber-200" />,
    content: <>Mint {NumWrap(1000)} ERC20 tokens to Bob</>,
  },
  {
    icon: <CurrencyDollarIcon className="w-5 opacity-40 text-amber-200" />,
    content: "Mint five unique ERC721 NFTs",
  },
  {
    icon: <PlusCircleIcon className="w-5 opacity-40 text-sky-300" />,
    content: <>Set allowance {NumWrap(800)} for Alice</>,
  },
  {
    icon: <ArrowCircleRightIcon className="w-5 opacity-40 text-emerald-400" />,
    content: <>Transfer {NumWrap(800)} ERC20 from Bob to Alice</>,
  },
  {
    icon: <MinusCircleIcon className="w-5 opacity-40 text-sky-300" />,
    content: "Set zero allowance for Alice",
  },
];
