"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserGetDto {
    id;
    name;
    surName;
    fullName;
    email;
    birthDate;
    telephone;
    employment;
    userAgreement;
}
exports.UserGetDto = UserGetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User id' }),
    __metadata("design:type", String)
], UserGetDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(64),
    (0, swagger_1.ApiProperty)({ description: 'User name', nullable: false }),
    __metadata("design:type", String)
], UserGetDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(64),
    (0, swagger_1.ApiProperty)({ description: 'User surname', nullable: false }),
    __metadata("design:type", String)
], UserGetDto.prototype, "surName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(130),
    (0, swagger_1.ApiProperty)({ description: 'User full name', nullable: false }),
    __metadata("design:type", String)
], UserGetDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({ description: 'User email', nullable: false }),
    __metadata("design:type", String)
], UserGetDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, swagger_1.ApiProperty)({ description: 'User birthday', nullable: true }),
    __metadata("design:type", Date)
], UserGetDto.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)('RU'),
    (0, swagger_1.ApiProperty)({ description: 'User phone', nullable: true }),
    __metadata("design:type", String)
], UserGetDto.prototype, "telephone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'User employment', nullable: true }),
    __metadata("design:type", String)
], UserGetDto.prototype, "employment", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ description: 'User agreement', nullable: true }),
    __metadata("design:type", Boolean)
], UserGetDto.prototype, "userAgreement", void 0);
//# sourceMappingURL=userGet.dto.js.map