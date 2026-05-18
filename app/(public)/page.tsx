import Banner from "../components/Banner";
import MidNightCollection from "../components/MidNightCollection";
import Service from "../components/Service";
import ShopCategoris from "../components/ShopCategoris";
import Subscribe from "../components/Subscribe";
import Trending from "../components/Trending";

export default function Home() {
  return (
    <div className="pt-14">
      <Banner/>
      <ShopCategoris/>
      <MidNightCollection/>
      <Trending/>
      <Service/>
      <Subscribe/>
    </div>
  );
}
  