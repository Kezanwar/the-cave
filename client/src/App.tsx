import { observer } from 'mobx-react-lite';
import Routes from './routes';
import AuthInitializer from './hocs/auth-initializer';
import Toaster from './hocs/toaster';

const App = observer(() => {
  return (
    <AuthInitializer>
      <Routes />
      <Toaster />
    </AuthInitializer>
  );
});

export default App;
