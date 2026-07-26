import { HomeView } from "@/components/HomeView";
import { getMenuItems } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const items = await getMenuItems();
  const featured = items.filter((i) => i.featured && i.available).slice(0, 4);
  return <HomeView featured={featured} />;
}
