import './App.css';
import Navbar from './Components/Navbar';
import Welcome from './Components/Welcome';
import Footer from './Components/Footer';
import Services from './Components/Services';
import Transactions from './Components/Transactions';

function App() {
  return (
    <div className="min-h-screen">
       <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
          <Transactions />
          <Footer />
       </div>       
    </div>
  );
}

export default App;
