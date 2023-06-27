import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@root/routes';
import '@root/App.scss';

const App = () => (
  <>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </>
);

export default App;
