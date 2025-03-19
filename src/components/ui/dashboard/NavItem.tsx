
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface NavItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  badgeHighlight?: boolean;
  isActive: boolean;
  onClick: (id: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({
  id,
  label,
  icon,
  badge,
  badgeHighlight,
  isActive,
  onClick
}) => {
  return (
    <Button
      key={id}
      variant="ghost"
      className={cn(
        "w-full justify-start font-normal",
        isActive && "bg-kubico-blue/10 text-kubico-blue font-medium"
      )}
      onClick={() => onClick(id)}
    >
      {icon}
      {label}
      {badge !== undefined && (
        <span className={cn(
          "ml-auto text-xs rounded-full px-2 py-0.5",
          badgeHighlight 
            ? "bg-kubico-blue/10 text-kubico-blue font-medium" 
            : "bg-gray-100 text-gray-600"
        )}>
          {badge}
        </span>
      )}
    </Button>
  );
};

export default NavItem;
