import { classNames } from "@client/utils";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Fragment } from "react";

const user = {
  name: "Azat Hafizov",
  email: "azat@optio.finance",
  imageUrl: "/azat.jpg",
};
const navigation = [
  { name: "Trade", href: "#" },
  { name: "Swap", href: "#" },
  { name: "Earn", href: "#" },
  { name: "Account", href: "#" },
  { name: "More", href: "#" },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-slate-800/40" aria-label="Global">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex items-center px-2 lg:px-0">
                <div className="h-12">
                  <img src="/spark.png" className="h-12" alt="Workflow" />
                </div>
                <div className="hidden lg:ml-8 lg:flex lg:space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        "rounded-md py-2 px-3 text-sm font-medium",
                        "text-white/50 hover:text-white hover:bg-indigo-700/50"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-400 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <button className="flex-shrink-0 bg-indigo-700 p-1 text-indigo-400 rounded-full hover:text-white/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-500 focus:ring-indigo-600">
                  <span className="sr-only">Notificaitons</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-4 relative flex-shrink-0">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-indigo-700 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-500 focus:ring-indigo-600">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-slate-600 text-slate-300" : "",
                                    "block px-4 py-2 text-sm text-slate-400"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="pt-2 pb-3 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-md py-2 px-3 text-base font-medium text-white hover:text-white hover:bg-indigo-400"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-indigo-500">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-indigo-200">
                    {user.email}
                  </div>
                </div>
                <button className="ml-auto flex-shrink-0 bg-indigo-500 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-500 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2">
                {userNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md py-2 px-3 text-base font-medium text-indigo-200 hover:text-white hover:bg-indigo-400"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
