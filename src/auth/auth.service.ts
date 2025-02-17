import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerBody: RegisterAuthDto) {
    const { password, ...user } = registerBody;
    const userParse = { ...user, password: await generateHash(password) };
    return this.userRepository.save(userParse);
  }

  async login(loginBody: LoginAuthDto) {
    const userExists = await this.userRepository.findOne({
      where: { email: loginBody.email },
    });
    if (!userExists) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    const isCheck = await compareHash(loginBody.password, userExists.password);

    if (!isCheck) {
      throw new HttpException('PASSWORD_INVALID', HttpStatus.NOT_FOUND);
    }

    delete userExists.password;
    return userExists;
  }
}
