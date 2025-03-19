
import React from 'react';
import NavItem, { NavItemProps } from './NavItem';

interface NavListProps {
  items: Omit<NavItemProps, 'onClick' | 'isActive'>[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  closeMobileMenu?: () => void;
}

const NavList: React.FC<NavListProps> = ({ items, activeTab, onTabChange, closeMobileMenu }) => {
  const handleItemClick = (itemId: string) => {
    onTabChange(itemId);
    if (closeMobileMenu) {
      closeMobileMenu();
    }
  };

  return (
    <div className="space-y-1">
      {items.map((item) => (
        <NavItem
          key={item.id}
          {...item}
          isActive={activeTab === item.id}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
};

export default NavList;
