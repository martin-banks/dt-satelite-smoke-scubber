/* eslint no-console: 0 */
const styles = {
	info: 'padding: 4px; background: lightblue; border-radius: 4px;',
}

function log({ type = 'info', content = 'add content' } = {}) {
	console.info(`%c ${content}`, styles[type])
}

export default log
