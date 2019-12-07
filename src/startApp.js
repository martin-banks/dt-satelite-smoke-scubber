/* eslint no-console: ['warn', {allow: ['error', 'warn', 'info']}] */

import config from './config.json'
import STATE from './state'
import isMobileDevice from './functions/isMobileDevice'


// This factory function runs basic set up functionswhen instantiated
// It also returns an object with a render method to add templated content to DOM

function start({ inner = '' } = {}) {
	const longform = document.querySelector('.longform-group')
	const standardMetro = document.querySelector('.content .story')
	const standardNews = document.querySelector('#page #story')
	// we store the project name in the config json file so it can be
	// referenced by other functions in particular the webpack config scripts
	// here we store the selector for the main app container

	const isTestEnv = () => ['localhost', '127.0.0.1'].indexOf(window.location.hostname) !== -1

	// Store key variables in single STATE oject for later use
	// This element is part of the embed code used in Methodé publishing

	STATE.appContainer = document.querySelector(`#${config.projectName}`)
	STATE.window = {
		width: window.innerWidth,
		height: window.innerHeight,
	}
	STATE.isMobile = isMobileDevice()
	STATE.rowWidths = [0]
	STATE.isLongform = !!longform
	STATE.isStandard = !!standardMetro || !!standardNews
	STATE.isTest = isTestEnv()

	// if a mobile device is detected a boolean is stored on
	// the main container as a flag for device specific styling
	STATE.appContainer.setAttribute('data-mobile', STATE.isMobile)
	const pageTemplate = () => {
		if (STATE.isLongform) return 'longform'
		if (STATE.isStandard) return 'standard'
		return 'test'
	}
	STATE.appContainer.setAttribute('data-pagetemplate', pageTemplate())

	// the STATE object is logged to the console for reference / debugging throuhgh development
	console.info({ STATE })

	return true
}

export default start
