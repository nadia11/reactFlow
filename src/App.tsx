import 'reactflow/dist/style.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import { ChatFlow} from './pages/chatBot/chatFlow';
import DefaultActions from './pages/chatBot/defaultAction';
import Login from './pages/chatBot/login';
import MyBots from './pages/chatBot/myBots';
import UnderConstruction from './pages/shared/underConstruction';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ChatFlow />} /> {/* Main Dashboard */}
        <Route path="/login" element={<Login/>} /> {/* Login Page */}
        <Route path="/myBots" element={<MyBots/>} />  {/* MyBots Page */}
        <Route path="/defaultActions" element={<DefaultActions/>} />  {/* MyBots Page */}
        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </Layout>
  );
}

export default App;
