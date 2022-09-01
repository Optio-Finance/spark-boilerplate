import Navbar from "@client/components/Navbar";
import React from "react";

type LayoutProps = { children: React.ReactNode };

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-xl mx-auto px-4 py-16 lg:pb-16">
        <div className="space-y-16">
          <div>
            <h1 className="text-2xl leading-6 font-medium text-slate-500">
              Launch your next L2 product over weekend
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              The modern full-stack StarkNet boilerplate, batteries included
            </p>
          </div>
          <div className="relative flex flex-col gap-y-4">
            {/* Main content */}
            {children}

            {/* Background blobs */}
            <div className="z-0 absolute w-56 h-16 top-8 left-10 bg-pink-500/50 blur-3xl pointer-events-none" />
            <div className="z-0 absolute w-56 h-16 top-8 right-10 bg-purple-500/50 blur-3xl pointer-events-none" />
            <div className="z-0 absolute w-56 h-16 top-32 left-40 bg-blue-500/50 blur-3xl pointer-events-none" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
