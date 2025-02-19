import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailTemplateService } from './email.template.service';

@Module({
  imports: [ConfigModule], // Importa ConfigModule para acceder a las variables de entorno
  providers: [EmailService, EmailTemplateService], // Registra el servicio
  exports: [EmailService], // Exporta el servicio para que otros módulos puedan usarlo
})
export class MailModule {}
