import { FaUser } from "react-icons/fa";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function UserButton() {
  return (
    <DropdownMenu>
      <div className="flex items-center justify-center">
        <DropdownMenuTrigger className="h-10 rounded-[50%]">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem>
          <LogOut className="mr-2 size-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
