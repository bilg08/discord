"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlusIcon, Users } from "lucide-react";
import useModal from "@/hooks/use-modal-store";

interface Props {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: Props) => {
  const {onOpen} = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full justify-between text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black  space-y-[2px]">
        {isModerator && (
            <DropdownMenuItem onClick={() => onOpen('invite', {server})} className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                Invite people
                <UserPlusIcon className="w-4 h-4 ml-auto"/>
            </DropdownMenuItem>
        )}
        {isModerator && (
            <DropdownMenuItem onClick={() => onOpen('editServer', {server})} className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                Server settings
                <Settings className="w-4 h-4 ml-auto"/>
            </DropdownMenuItem>
        )}
        {isModerator && (
            <DropdownMenuItem onClick={() => onOpen('manageMembers', {server})} className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                Manage members
                <Users className="w-4 h-4 ml-auto"/>
            </DropdownMenuItem>
        )}
        {isModerator && (
            <DropdownMenuItem onClick={() => onOpen('createChannel', {server})} className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                Create channel
                <PlusCircle className="w-4 h-4 ml-auto"/>
            </DropdownMenuItem>
        )}
        {isModerator && (
            <DropdownMenuSeparator />
        )}
        {isAdmin && (
            <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
            Delete server
            <Trash className="w-4 h-4 ml-auto"/>
        </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem onClick={() => onOpen('leaveServer', {server})} className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
            Leave server
            <LogOut className="w-4 h-4 ml-auto"/>
        </DropdownMenuItem>
        )}
            
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ServerHeader;
