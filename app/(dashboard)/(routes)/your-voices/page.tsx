import VoiceList from "./VoiceList";
import SearchVoices from "./SearchVoices";

const YourVoicesPage = async ({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
    };
  }) => {
    const query = searchParams?.query || '';
  return (
    <div className="bg-slate-100 h-screen px-20">
       <h1 className="py-8">Search for Your Saved Voices</h1>
       <SearchVoices />
       <VoiceList  query={query} />
    </div>
  )
}

export default YourVoicesPage