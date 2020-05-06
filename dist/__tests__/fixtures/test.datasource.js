"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
exports.testdb = new repository_1.juggler.DataSource({
    name: 'db',
    connector: 'memory',
});
//# sourceMappingURL=test.datasource.js.map