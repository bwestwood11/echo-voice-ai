import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Editor } from "@/components/Editor";
import FileUpload from "@/components/FileUpload";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full">
      <h1
        className={cn("text-center font-extrabold text-2xl mb-10", montserrat.className)}
      >
        {session?.user.name}'s Dashboard Page
      </h1>
    </div>
  );
};

export default DashboardPage;
