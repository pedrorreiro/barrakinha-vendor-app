import { Redirect } from "expo-router";
import { Screens } from "./_layout";

// export default function Index() {
//   return <Redirect href="/drawer" />;
// }

export default function Index() {
  return <Redirect href={`/${Screens.WELCOME}`} />;
}
