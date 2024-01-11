import './App.css';

import { Background } from '../Background';
import { StatusBar } from '../StatusBar';
import { Terminal } from '../Terminal';
import { ProvidersWrapper } from '../../components/ProvidersWrapper';

export const App: React.FC<{}> = ({}) => {
	return (
		<ProvidersWrapper>
			<Background className='App__Background'>
				<StatusBar className='App__StatusBar' />
				<Terminal className='App__Terminal' />
			</Background>
		</ProvidersWrapper>
	);
}
