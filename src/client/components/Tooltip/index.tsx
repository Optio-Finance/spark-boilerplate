import { ReactNode } from 'react';
import { classNames } from '@client/utils';

const Tooltip = ({
    children,
    title,
    from,
    to,
    duration = 'duration-100'
  }: {
    children: ReactNode,
    title: string,
    from: string,
    to: string,
    duration?: string,
  }) => {
    return (
      <>
        <span className={classNames(
          from, to, duration,
          'absolute px-2 py-1 left-8 text-xs whitespace-nowrap',
          'transition transform-gpu opacity-0',
          'group-hover:opacity-100 ease-in-out',
          'pointer-events-none rounded shadow-sm',
          'bg-white text-gray-500',
        )}>
          {title}
        </span>
        {children}
      </>
    );
};

export default Tooltip;