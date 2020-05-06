"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const testlab_1 = require("@loopback/testlab");
const models_1 = require("../../models");
async function setupApplication() {
    const restConfig = testlab_1.givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
    });
    const app = new __1.CommonApiApplication({
        rest: restConfig,
    });
    await app.boot();
    await app.start();
    const client = testlab_1.createRestAppClient(app);
    return { app, client };
}
exports.setupApplication = setupApplication;
function givenDataset(dataset) {
    const data = Object.assign({
        pid: '10.10572',
        name: 'Small-angle scattering of pressurised water',
        size: 3,
        isPublic: true,
        creationDate: '2019-09-27T06:04:21.429Z',
    }, dataset);
    return new models_1.Dataset(data);
}
exports.givenDataset = givenDataset;
//# sourceMappingURL=test-helper.js.map