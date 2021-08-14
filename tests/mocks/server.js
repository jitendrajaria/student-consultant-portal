const request = require("supertest");
const config = require("../../config");
const Server = require("../../server");

class ServerMock {
  constructor() {
    this.config = config;
  }

  setup() {
    const server = new Server(this.config);
    if (server.app) {
      return request(server.app);
    }
  }
}

module.exports = ServerMock;
