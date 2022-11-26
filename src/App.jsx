import Page1 from "./Page1";
import Page2 from "./Page2";
import { usePlayerContext } from "./playerContext";

const App = () => {
  const { page } = usePlayerContext();

  if (page == 1) return <Page1 />;
  if (page == 2) return <Page2 />;
};
export default App;
