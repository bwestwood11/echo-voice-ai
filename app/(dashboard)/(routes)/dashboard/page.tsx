import { Montserrat } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import { MdRecordVoiceOver } from "react-icons/md";
import { IoText } from "react-icons/io5";
import { MdAudiotrack } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import { auth } from "@/auth";
import { Metadata } from "next";
import {
  getAudioFiles,
  getFreeCharacterCount,
  getFreeTotalCount,
  getProCharacterCount,
  getProTotalCount,
} from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { MAX_FREE_CHARACTERS, MAX_PRO_CHARACTERS } from "@/constants";
import SearchBar from "@/components/search-bar";
import SavedVoices from "@/components/saved-voices";
import PaginationControls from "@/components/PaginationControls";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "User's dashboard to view previous voice creations, data about their account, and more.",
  alternates: {
    canonical: "https://www.voicefusion.io/dashboard",
  },
};

const DashboardPage = async ({
  searchParams
}: {
  searchParams: {
    query?: string;
    page: string;
    per_page: string;
  };
}) => {
  const session = await auth();
  const isPro = await checkSubscription();
  const totalFreeCreations = await getFreeTotalCount();
  const totalFreeCharacters = await getFreeCharacterCount();
  const totalProCharacters = await getProCharacterCount();
  const totalProCreations = await getProTotalCount();
  const audioFiles = await getAudioFiles();

  
  const stats = [
    {
      title: "Total Voice Creations",
      value: isPro ? totalProCreations : totalFreeCreations,
      icon: <MdRecordVoiceOver className="text-[#ff8303] text-3xl" />,
      progress: isPro
        ? (((totalProCreations as number) / MAX_PRO_CHARACTERS) as number) * 100
        : (((totalFreeCreations as number) / MAX_FREE_CHARACTERS) as number) *
          100,
    },
    {
      title: "Total Characters Used",
      value: isPro ? totalProCharacters : totalFreeCharacters,
      icon: <IoText className="text-[#ff8303] text-3xl" />,
      progress: isPro
        ? (((totalProCharacters as number) / MAX_PRO_CHARACTERS) as number) *
          100
        : (((totalFreeCharacters as number) / MAX_FREE_CHARACTERS) as number) *
          100,
    },
    {
      title: "Saved Audio Files",
      value: audioFiles ? audioFiles.length : 0,
      icon: <MdAudiotrack className="text-[#ff8303] text-3xl" />,
      progress: isPro
        ? (((totalProCreations as number) / MAX_PRO_CHARACTERS) as number) * 100
        : (((totalFreeCreations as number) / MAX_FREE_CHARACTERS) as number) *
          100,
    },
  ];

  const query = searchParams?.query || "";
  const page = searchParams["page" ] ?? "1"
  const per_page = searchParams["per_page"] ?? "5"
  console.log("query", query);

  return (
    <section className="w-full h-full bg-slate-100">
      <h4 className="h2-bold text-center pt-6">
        {session?.user.name}'s <span className="text-[#ff8303]">Dashboard</span>
      </h4>
      <p className="text-center mt-4 max-w-xl mx-auto px-12">
        Welcome to your dashboard! Here you will be able to view your previous
        voice creations and organize them into a more manageable list.
      </p>
      <Separator orientation="horizontal" className="my-10 w-full" />
      <h4 className="text-left text-2xl font-bold px-14">Account Statistics</h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 px-10 mt-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex flex-col bg-white rounded-lg shadow-lg p-4 m-4 h-full"
          >
            <div className="flex flex-row items-center w-full justify-between">
              <h4 className="font-medium text-xl">{stat.title}</h4>
              <div className="mr-6">{stat.icon} </div>
            </div>
            <p className="text-slate-900 text-4xl font-extrabold mt-3">
              {stat.value}
            </p>
            <Separator orientation="horizontal" className="my-16 w-full" />
            <Progress value={stat.progress} />
            <p className="mt-2">Total Used</p>
          </div>
        ))}
      </div>
      <Separator orientation="horizontal" className="mt-16 mb-8 w-full" />
     

      <div className="mt-10 px-14">
        <h4 className="text-left text-2xl font-bold">Saved Voices</h4>
        <SearchBar />
        <SavedVoices query={query} page={page} per_page={per_page} audioFiles={audioFiles}/>
        <PaginationControls hasNextPage={true} hasPrevPage={true} />
      </div>
   
    </section>
  );
};

export default DashboardPage;
