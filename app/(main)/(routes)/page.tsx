import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const HomePage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
};

export default HomePage;
