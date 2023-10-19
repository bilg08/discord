import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useModal from "@/hooks/use-modal-store";
import useOrigin from "@/hooks/use-origin";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";

const InviteModal = () => {
  const { type, onClose, isOpen, data, onOpen } = useModal();
  const server = data?.server
  const isModalOpen = type === "invite" && isOpen;
  const origin = useOrigin();
  const [copied, setCopied] = useState(false);
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
    
  };

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
        const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
        onOpen('invite', {server: response?.data});
    } catch (error) {
        return
    } finally {
        setLoading(false);
    }
  }


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-dark p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold text-zinc-800">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={loading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button size={"icon"} onClick={onCopy}>
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            variant={"link"}
            size={"sm"}
            onClick={onNew}
            className="text-xs text-zinc-500 mt-4"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
