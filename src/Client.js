var EventEmitter = require("events").EventEmitter;
const Util = require("./Util/Util.js");
const pm = require("./Packetmanager.js");
try {
  EventEmitter = require("eventemitter16");
} catch(err) {
  try {
    EventEmitter = require("eventemitter3");
  } catch(err) {}
}

const eris = require("eris");

class Client extends EventEmitter {
  constructor(options) {
    super();
    this.options = {
      shardId: 0,
      shardCount: 0,
      messageCacheMaxSize: 200,
      disabledEvents: [],
      fetchAllMembers: false,
      ws: null,
      disableEveryone: true,
      compress: true,
      autoreconnect: true,
      largeThreshold: 250,
      latencyThreshold: 4000,
      guildCreateTimeout: 2000,
      connectionTimeout: 30000
    };
    if (typeof options === "object") {
      for (var i of Object.keys(options)) this.options[i] = options[i];
    }
    
    this.packetmanager = new pm();
  }
  login(token) {
    if (this.eris && this.eris.ready) throw new Error("Already logged in");
    if (!token && !this.token) Promise.reject(new Error("No token given"));
    this.token = token;
    if (!this.eris) {
      this.options = Util.erisify(this.options);
      this.eris = new eris(this.token, this.options);
      this.eris.on("rawWS", this.packetmanager.packet.bind(this));
    }
    this.eris.connect();
  }
}
