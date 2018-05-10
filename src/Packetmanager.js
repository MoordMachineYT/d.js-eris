class Packetmanager {
  constructor(client) {
    this.client = client;
    this.eris = this.client.eris;
  }
  packet(packet, shard) {
    if (!packet) throw new Error("received an empty packet");
    if (packet.op !== 0) return;
    if (!this.client.options.disabledEvents[packet.t]) {
      packet.shard = shard;
      this.handle(packet);
    }
  }
  handle(packet) {
    switch(packet.t) {
      case "MESSAGE_CREATE": {
        
      }
    }
  }
}

module.exports = Packetmanager;
