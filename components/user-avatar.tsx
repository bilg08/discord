import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "./ui/avatar"

interface Props {
    src?: string,
    className?: string
}

const UserAvatar = ({
src, className
}: Props) => {
    return (
        <Avatar className={cn('h-8 w-7 md:h-10 md:w-10', className)}>
            <AvatarImage src={src}/>
        </Avatar>
    )
};

export default UserAvatar;