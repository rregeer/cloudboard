import io from 'socket.io-client'
import config from '../etc/config.json'

const socket = io.connect(config.appUrl)

export default socket
