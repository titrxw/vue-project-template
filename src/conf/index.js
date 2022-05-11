
import DevConf from './dev'
import ProducationConf from './producation'

let config
if (process.env.NODE_ENV === 'production') {
    config = ProducationConf
} else {
    config = DevConf
}

export default config