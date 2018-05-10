class Util {
  erisify(options) {
    options.getAllUsers = options.fetchAllMembers;
    options.messageLimit = options.messageCacheMaxSize;
    options.firstShardID = options.shardId;
    options.maxShards = options.shardCount;
    return options;
  }
}

module.exports = new Util;
