import { classNames } from "@client/utils";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import styles from "./styles.module.css";

export default function ModalComponent({
  isOpen,
  closeModal,
  poolA,
  poolB,
  ampl,
  setPoolA,
  setPoolB,
  setAmpl,
}: any) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={classNames(
                    "w-full max-w-md transform overflow-hidden rounded-2xl backdrop-blur-lg bg-blue-500/30",
                    "p-6 text-left align-middle shadow-xl transition-all"
                  )}
                >
                  <Dialog.Title as="h3" className={styles.title}>
                    Optio: Empowering StarkNet ecosystem
                  </Dialog.Title>
                  <div className="mt-2 mb-8">
                    <p className="text-sm text-slate-400">
                      Cairo implementation of stableswap pool
                    </p>
                  </div>

                  <div className="mt-2 flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-400">
                        USDT supply:
                      </label>
                      <input
                        type="number"
                        className={styles.input}
                        onChange={({ target }) =>
                          setPoolA(Number(target.value))
                        }
                        defaultValue={poolA}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-400">
                        USDC supply:
                      </label>
                      <input
                        type="number"
                        className={styles.input}
                        onChange={({ target }) =>
                          setPoolB(Number(target.value))
                        }
                        defaultValue={poolB}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-end gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-400">
                        A coeff:
                      </label>
                      <input
                        type="number"
                        className={styles.input}
                        onChange={({ target }) => setAmpl(Number(target.value))}
                        defaultValue={ampl}
                      />
                    </div>
                    <div className="flex-1">
                      <button
                        type="button"
                        className={classNames(
                          "w-full inline-flex justify-center rounded-md border border-transparent bg-blue-300",
                          "px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        )}
                        onClick={closeModal}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
