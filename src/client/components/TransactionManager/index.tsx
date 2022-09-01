import { classNames } from "@client/utils";
import { Transaction, useStarknetTransactionManager } from "@spark/txs";

export default function TransactionManager() {
  const { transactions } = useStarknetTransactionManager();
  return (
    <div
      className={classNames(
        "z-10 w-full px-6 py-3 pr-3 flex items-center rounded-lg text-slate-400",
        "bg-slate-700 bg-opacity-30 backdrop-blur-sm"
      )}
    >
      {transactions.length === 0 ? (
        <span className="flex-1 text-sm text-slate-600">
          No transactions so far
        </span>
      ) : (
        <ul>
          {transactions.map((tx, index) => (
            <TransactionItem key={index} transaction={tx} />
          ))}
        </ul>
      )}
    </div>
  );
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <li className="flex justify-between gap-2 text-sm text-slate-400">
      <span className="text-slate-400">{transaction.status}:</span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://beta-goerli.voyager.online/tx/${transaction.transactionHash}`}
        className="truncate"
      >
        {transaction.transactionHash}
      </a>
    </li>
  );
}
