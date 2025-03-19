
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserProfileProps {
  name: string;
  avatar: string;
  role: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, avatar, role }) => {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <Avatar className="h-12 w-12">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="font-semibold">{name}</h2>
        <p className="text-sm text-kubico-gray-medium">{role}</p>
      </div>
    </div>
  );
};

export default UserProfile;
