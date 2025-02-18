import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '../auth/entities/user.entity';

@Module({})
export class EventMailModule {
  @OnEvent('user.created')
  handleUserCreayedEvent(payload: User) {
    console.log('__EVENT_USER__', payload);
    //   Enviar email
  }
}
