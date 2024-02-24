import SearchVoices from "./SearchVoices"
import VoiceList from "./VoiceList";

const VoicesPage = ({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
    };
  }) => {
    const query = searchParams?.query || '';

  return (
    <div>
        <h1>Search Voices Here:</h1>
        <SearchVoices />
        <VoiceList query={query} />
    </div>
  )
}

export default VoicesPage