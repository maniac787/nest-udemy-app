import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async register(registerBody: RegisterAuthDto) {
    const { password, ...user } = registerBody;
    const userParse = { ...user, password: await generateHash(password) };
    const newUser = await this.userRepository.save(userParse);
    this.eventEmitter.emit('user.created', newUser);
    return newUser;
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
    const payload = {
      id: userExists._id,
    };

    const token = await this.jwtService.sign(payload);

    const data = {
      token,
      user: userExists,
    };
    return data;
  }
}
