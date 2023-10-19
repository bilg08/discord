import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import useModal from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { MoreVertical, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
  const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
    "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500"/>
  }
  const MemberModal = () => {
    const router = useRouter();
    const {type, onClose, isOpen, data} = useModal();
    const [loadingId, setLoadingId] = useState('');
    const isModalOpen = type === 'manageMembers' && isOpen;
    const server: ServerWithMembersWithProfiles = data?.server;
    
    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-dark overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold text-zinc-800">
              ManageMembers
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              {server?.members?.length} Members
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-8 max-h-[420px] pr-6">
              {server?.members?.map((member) => (
                <div key={member.id} className="flex items-center gap-x-2 mb-6">
                  <UserAvatar src={member?.profile?.imageUrl}/>
                  <div className="flex flex-col gap-y-1">
                    <div className="text-xs font-semibold flex items-center gap-x-1 text-black">
                      {member?.profile?.name}
                      {roleIconMap[member?.role]}
                    </div>
                    <p className="text-xs text-zinc-500">
                      {member?.profile?.email}
                    </p>
                  </div>
                  {/* {server.profileId !== member?.profileId && ( */}
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreVertical className="w-4 h-4"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side='left'>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center">
                              <ShieldQuestion className="w-4 h-4 mr-2"/>
                              <span>Role</span>
                            </DropdownMenuSubTrigger>
                          </DropdownMenuSub>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  {/* )} */}
                </div>
              ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default MemberModal;
  