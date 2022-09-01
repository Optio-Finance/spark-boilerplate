import { FunctionComponent, useState } from "react";

import DashboardLayout from "@client/layouts/dashboardLayout";
import PageWithLayoutType from "@client/layouts/pageWithLayout";
import { LayoutProps } from "@client/utils/types";

import ActionListComponent from "@client/components/Homepage/ActionList";
import { classNames } from "@client/utils";
import { Icon } from "@spark/connectors/icons";
import { useContract } from "@spark/contracts";
import { useStarknet } from "@spark/starknet";
import toast from "react-hot-toast";
import { Call } from "starknet";

const Homepage: FunctionComponent<LayoutProps> = () => {
  const { account, connectors, wallet } = useStarknet();
  const { erc1155Contract } = useContract();
  const [success, setDone] = useState(false);

  const onClick = async () => {
    if (account) {
      const calls: Call[] = [
        {
          contractAddress: erc1155Contract.address,
          entrypoint: "mint",
          calldata: [account, 5, 0, 888, 0],
        },
        {
          contractAddress: erc1155Contract.address,
          entrypoint: "mint",
          calldata: [account, 6, 0, 888, 0],
        },
        {
          contractAddress: erc1155Contract.address,
          entrypoint: "mint",
          calldata: [account, 7, 0, 888, 0],
        },
      ];
      try {
        const acc = await connectors[0].account();
        const nonce = await acc.getNonce();
        await toast.promise(
          acc.execute(calls, undefined, { maxFee: 500, nonce }),
          {
            loading: "Communicating with StarkNet...",
            success: "Transaction sent successfully!",
            error: "Something went wrong",
          },
          {
            style: {
              borderRadius: "7px",
              background: "#334155AB",
              color: "#fff",
            },
            position: "bottom-center",
            success: {
              duration: 5000,
              icon: "🔥",
            },
          }
        );
        setDone(true);
      } catch (error) {
        toast("You've rejected Awesomeness!", {
          icon: "😳",
          style: {
            borderRadius: "7px",
            background: "#334155AB",
            color: "#fff",
          },
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <>
      <div
        className={classNames(
          "z-[5] w-full px-6 py-3 pr-3 flex items-center rounded-lg text-slate-400",
          "bg-slate-700 bg-opacity-30 backdrop-blur-sm"
        )}
      >
        {account ? (
          <div className="flex items-center">
            <span className="text-orange-400">{Icon(wallet)}</span>
            Wallet address: {account.slice(0, 6)}...
            {account?.slice(61)}
          </div>
        ) : (
          <>
            <div className="flex-1">Connect your StarkNet wallet</div>
            <button
              className={classNames(
                "px-3 py-1.5 rounded-md hover:bg-slate-600 text-slate-300",
                "text-sm"
              )}
            >
              Connect
            </button>
          </>
        )}
      </div>

      {/* Multicall section */}
      <div
        className={classNames(
          "z-[5] w-full flex flex-col rounded-lg text-slate-400",
          "bg-slate-700 bg-opacity-30 backdrop-blur-2xl overflow-hidden"
        )}
      >
        <div
          className={classNames(
            "px-6 py-4 pr-4 flex items-center bg-slate-700",
            "bg-opacity-30 backdrop-blur-2xl"
          )}
        >
          <div className="flex-1 text-slate-200">
            Perform multiple actions in one go
          </div>
          <button
            className={classNames(
              "px-3 py-1.5 rounded-md hover:bg-slate-600 text-slate-300",
              "text-sm"
            )}
            onClick={onClick}
          >
            Sign all
          </button>
        </div>

        {/* List of StarkNet state changes to process */}
        <ActionListComponent success={success} />
      </div>
    </>
  );
};

(Homepage as PageWithLayoutType).layout = DashboardLayout;

export default Homepage;
