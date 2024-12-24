import 'reactflow/dist/style.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import { ChatFlow} from './pages/chatBot/chatFlow';
import DefaultActions from './pages/chatBot/defaultAction';
import Login from './pages/chatBot/login';
import MyBots from './pages/chatBot/myBots';
import KeywordAction from './pages/chatBot/keywordAction';
import UnderConstruction from './pages/shared/underConstruction';
import { Toaster } from 'react-hot-toast';
import ReplyActionPage from './pages/chatBot/replyActionPage';
function App() {
  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
    <Layout>
      <Routes>
        <Route path="/" element={<ChatFlow />} /> {/* Main Dashboard */}
        <Route path="/login" element={<Login/>} /> {/* Login Page */}
        <Route path="/myBots" element={<MyBots/>} />  {/* MyBots Page */}
        <Route path="/defaultActions" element={<DefaultActions/>} />  {/* Default Action Page */}
        <Route path="/keywordActions" element={<KeywordAction/>} />  {/* Default Action Page */}
        <Route path="/replyActions" element={<ReplyActionPage/>} />  {/* Default Action Page */}
        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </Layout>
    </>
  );
}

export default App;
