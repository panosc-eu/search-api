"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("@loopback/authentication");
const boot_1 = require("@loopback/boot");
const rest_explorer_1 = require("@loopback/rest-explorer");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const path = __importStar(require("path"));
const sequence_1 = require("./sequence");
const auth_1 = require("./auth");
const repositories_1 = require("./repositories");
const models_1 = require("./models");
class CommonApiApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.bind(rest_explorer_1.RestExplorerBindings.CONFIG).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.bind(authentication_1.AuthenticationBindings.METADATA).toProvider(auth_1.MyAuthMetadataProvider);
        this.bind(auth_1.MyAuthBindings.STRATEGY).toProvider(auth_1.MyAuthStrategyProvider);
        this.bind(authentication_1.AuthenticationBindings.AUTH_ACTION).toProvider(auth_1.MyAuthActionProvider);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
    async seedData() {
        const userRepository = await this.getRepository(repositories_1.UserRepository);
        const roleRepository = await this.getRepository(repositories_1.RoleRepository);
        const userRoleRepository = await this.getRepository(repositories_1.UserRoleRepository);
        await userRepository.create(new models_1.User({ id: 'admin', password: 'hash-this1', email: 'admin@test.test' }));
        await userRepository.create(new models_1.User({
            id: 'admin2',
            password: 'hash-this2',
            email: 'admin2@test.test',
        }));
        await userRepository.create(new models_1.User({ id: 'user', password: 'hash-this3', email: 'user@test.test' }));
        await roleRepository.create(new models_1.Role({ id: 'ADMIN', description: 'admin' }));
        await roleRepository.create(new models_1.Role({ id: 'ADMIN2', description: 'admin2' }));
        await userRoleRepository.create(new models_1.UserRole({ userId: 'admin', roleId: 'ADMIN' }));
        await userRoleRepository.create(new models_1.UserRole({ userId: 'admin2', roleId: 'ADMIN' }));
        await userRoleRepository.create(new models_1.UserRole({ userId: 'admin2', roleId: 'ADMIN2' }));
    }
}
exports.CommonApiApplication = CommonApiApplication;
//# sourceMappingURL=application.js.map