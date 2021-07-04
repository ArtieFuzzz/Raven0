import Yiff from 'yiff'
import pkg from '../../config'

const yiff = new Yiff({
	useragent: `Raven0/${pkg.version} (https://raven0-bot.gitlab.io/)`,
	killswitch: {
		enabled: true
	}
})

export default yiff
