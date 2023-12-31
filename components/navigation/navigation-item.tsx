"use client";

import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  id: string;
  name: string;
  imageUrl: string;
}
const NavigationItem = ({ id, name, imageUrl }: Props) => {
  const params = useParams();
  const router = useRouter();
  const isActiveServer = params?.serverid === id;
  const handleClick = () => {
    router.push(`/servers/${id}`)
  }
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={handleClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            !isActiveServer && "group-hover:h-[20px]",
            isActiveServer ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
