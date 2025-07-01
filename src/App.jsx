import DailyTracker from "./components/DailyTracker";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <DailyTracker />
      <Footer />
    </div>
  );
}

export default App;