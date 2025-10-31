import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Post } from './pages/Post';

function App() {
  // basename should match the base in vite.config.ts
  // Change to "/" for custom domain or root deployment
  return (
    <BrowserRouter basename="/kiy0der-blog">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post/:slug" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
