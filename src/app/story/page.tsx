import type { Metadata } from "next";
import { StoryView } from "@/components/StoryView";

export const metadata: Metadata = {
  title: "Hikâyemiz",
};

export default function StoryPage() {
  return <StoryView />;
}
