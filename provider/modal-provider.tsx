"use client";

import CreateChannelModal from "@/components/modal/create-channel";
import CreateServerModal from "@/components/modal/create-server-modal";
import EditServerModal from "@/components/modal/edit-server-modal";
import InviteModal from "@/components/modal/invite-modal";
import MemberModal from "@/components/modal/member-modal";
import RemoveServerModal from "@/components/modal/remove-server-modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemberModal />
      <CreateChannelModal />
      <RemoveServerModal />
    </>
  );
};

export default ModalProvider;
