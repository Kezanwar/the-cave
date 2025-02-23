import store from '@app/store';
import { observer } from 'mobx-react-lite';

import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@app/components/web/ui/dropdown-menu';

import { IoLogOutOutline } from 'react-icons/io5';

const UserAvatar = observer(() => {
  const user = store.auth.user;
  if (!user) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer active:scale-95 transition-transform ">
          <AvatarFallback>
            {user.first_name.charAt(0)}
            {user.last_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          onClick={store.auth.unauthenticate}
          className="flex justify-between "
        >
          Logout <IoLogOutOutline size={16} />
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default UserAvatar;
