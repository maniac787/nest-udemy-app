import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ObjectId, Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: ObjectId }) {
    const objectId = payload.id;
    console.log('__USER ID__', objectId);
    const userExists = await this.userRepository.findOne({
      where: { id: objectId },
    });

    console.log('userExists', userExists);
    return payload;
  }
}
