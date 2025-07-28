"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const utils_1 = require("./utils");
class UsersService {
    usersDB = {
        '1': {
            name: 'Admin',
            id: '1',
            surName: 'Admin',
            fullName: 'Admin',
            password: 'admin',
            email: 'admin@inno.tech',
        },
    };
    getAll() {
        return Object.values(this.usersDB).map(({ password, ...rest }) => ({ ...rest }));
    }
    createUser({ email, name, ...rest }) {
        const id = (0, uuid_1.v4)();
        const checkIsEmailUnique = (0, utils_1.findUserByEmail)(this.usersDB, email);
        if (checkIsEmailUnique)
            throw new common_1.HttpException('Already exist', common_1.HttpStatus.CONFLICT);
        this.usersDB[id] = { ...rest, email, name, id };
        return { name, id };
    }
    findById(id) {
        const user = this.usersDB[id];
        if (!user)
            throw new common_1.NotFoundException();
        const { password, ...response } = user;
        return response;
    }
    updateUser(id, data) {
        const user = this.usersDB[id];
        if (!user) {
            if (!user)
                throw new common_1.NotFoundException();
        }
        const { password, email, id: userId } = user;
        this.usersDB[id] = { password, id: userId, email, ...data };
        return 'ok';
    }
    findOneByEmail(email) {
        const user = (0, utils_1.findUserByEmail)(this.usersDB, email);
        return user || null;
    }
    deleteUser(id) {
        delete this.usersDB[id];
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map