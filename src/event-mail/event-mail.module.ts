import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '../auth/entities/user.entity';
import { EmailService } from '../mail/email.service';
import { EmailTemplateService } from '../mail/email.template.service';

@Module({
  providers: [EmailService, EmailTemplateService], // Registra ambos servicios
})
export class EventMailModule {
  constructor(private readonly mailService: EmailService) {}

  @OnEvent('user.created')
  handleUserCreayedEvent(payload: User) {
    console.log('__EVENT_USER__', payload);
    //   Enviar email
    this.mailService.sendWelcomeEmail(payload.email, payload.name);
  }
}
