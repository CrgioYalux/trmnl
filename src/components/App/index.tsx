import './App.css';

import { Frame } from '../Frame';
import { Background } from '../Background';
import { StatusBar } from '../StatusBar';
import { Terminal } from '../Terminal';

export const App: React.FC<{}> = ({}) => {
	return (
		<Frame>
			<Background className='App__Background'>
				<StatusBar className='App__StatusBar' />
				<Terminal className='App__Terminal' />
			</Background>
		</Frame>
	);
}
