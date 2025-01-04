import 'reactflow/dist/style.css';
import { Routes, Route , useLocation} from 'react-router-dom';
import Layout from './components/layout';
import { ChatFlow} from './pages/chatBot/chatFlow';
import DefaultActions from './pages/chatBot/defaultAction';
import Login from './pages/chatBot/login';
import MyBots from './pages/chatBot/myBots';
import KeywordAction from './pages/chatBot/keywordAction';
import UnderConstruction from './pages/shared/underConstruction';
import { Toaster } from 'react-hot-toast';
import ReplyActionPage from './pages/chatBot/replyActionPage';
import Register from './pages/chatBot/register';

function App() {
  // if (!window.setImmediate) {
  //   window.setImmediate = function(callback) {
  //     setTimeout(callback, 0);
  //   };
  // }
  const location = useLocation();
  // Define routes that should not include the Layout
  const noLayoutRoutes = ['/login', '/register'];
  const isNoLayoutRoute = noLayoutRoutes.includes(location.pathname);
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    {isNoLayoutRoute ? (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    ) : (
      <Layout>
        <Routes>
          <Route path="/" element={<ChatFlow />} /> {/* Main Dashboard */}
          <Route path="/myBots" element={<MyBots />} /> {/* MyBots Page */}
          <Route path="/defaultActions" element={<DefaultActions />} /> {/* Default Action Page */}
          <Route path="/keywordActions" element={<KeywordAction />} /> {/* Keyword Action Page */}
          <Route path="/replyActions" element={<ReplyActionPage />} /> {/* Reply Action Page */}
          <Route path="*" element={<UnderConstruction />} />
        </Routes>
      </Layout>
    )}
  </>
  );
}

export default App;
