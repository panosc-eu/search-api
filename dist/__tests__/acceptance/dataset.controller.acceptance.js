"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_helper_1 = require("./test-helper");
describe('dataset', () => {
    let app;
    let client;
    before('setupApplication', async () => {
        ({ app, client } = await test_helper_1.setupApplication());
    });
    after(async () => {
        await app.stop();
    });
    it('exposes datasets endpoint with json type', async () => {
        await client.get('/datasets').expect(200);
    }).timeout(5000);
});
//# sourceMappingURL=dataset.controller.acceptance.js.map