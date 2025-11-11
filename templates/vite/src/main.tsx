import './global.css';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router';
import {App} from './app';

async function enableMocking() {
	// TODO: uncomment this line
	// if (process.env.NODE_ENV !== 'development') {
	//   return
	// }
	const {worker} = await import('./mocks/browser')
	return worker.start()
}

const container = document.querySelector('#root')
enableMocking()
	.then(() => {
		if (container) {
			const root = createRoot(container)
			root.render(
				<StrictMode>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</StrictMode>
			)
		}
	})
	.catch(error => {
		throw new Error(`Failed to enable mocking: ${error}`)
	})
