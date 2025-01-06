import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function Link({ children, href, className, ...props }: LinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <RouterLink
      to={href}
      className={cn(
        'flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors',
        isActive && 'bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white',
        className
      )}
      {...props}
    >
      {children}
    </RouterLink>
  );
}