import { StoreProvider } from "@/store";
import { Editor } from '@/components/Editor';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor",
  description: "Edit your video!",
  alternates: {
    canonical: "https://www.voicefusion.io/video-editor",
  },
};

function EditorPage() {
  return (
    <StoreProvider>
      <Editor></Editor>
    </StoreProvider>
  );
}

EditorPage.diplsayName = "EditorPage";

export default EditorPage;