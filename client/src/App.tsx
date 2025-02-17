import { observer } from 'mobx-react-lite';
import Routes from './routes';
import AuthInitializer from './hocs/auth-initializer';

const App = observer(() => {
  return (
    <AuthInitializer>
      <Routes />
    </AuthInitializer>
  );
});

export default App;
