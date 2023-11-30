
import { authOptions } from "@/utils/authOptions";
import VideoProcessor from "@/components/FileUpload";
import FileUpload from "@/components/file-upload";
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
      <div>
        <h2 className={cn("text-center font-extrabold text-2xl mb-10", montserrat.className)}>
          Upload a file
        </h2>
      </div>
      <FileUpload/>
      {/* <VideoProcessor /> */}
    </div>
  );
};

export default DashboardPage;
