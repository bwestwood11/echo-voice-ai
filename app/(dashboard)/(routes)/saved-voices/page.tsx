import YourVoices from './YourVoices'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Your Voices",
  description: "Select from a variety of voices that you saved to your account!",
  alternates: {
    canonical: "https://www.voicefusion.io/saved-voices",
  },
};

const SavedVoicesPage = () => {
  return (
    <div>
      <YourVoices />
    </div>
  )
}

export default SavedVoicesPage