import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getFreeCharacterCount, getProCharacterCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const freeCharacterCount = await getFreeCharacterCount();
  const proCharacterCount = await getProCharacterCount();
  const isPro = await checkSubscription()

  const formattedApiLimitCount = typeof freeCharacterCount === 'number' ? freeCharacterCount : 0;
  const formattedCharacterCount = typeof proCharacterCount === 'number' ? proCharacterCount : 0;
  

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar isPro={isPro} freeCharacterCount={formattedApiLimitCount} proCharacterCount={formattedCharacterCount} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
