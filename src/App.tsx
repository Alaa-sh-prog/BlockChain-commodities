import { CoinsList } from "./components/CoinsList/CoinsList";
import { Header } from "./components/Header";
import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <Layout>
        <Header />
        <CoinsList />
      </Layout>
    </div>
  );
}

export default App;
