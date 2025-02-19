import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';
import { EmailTemplateService } from './email.template.service';
import * as process from 'node:process';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(
    private configService: ConfigService,
    private templateService: EmailTemplateService, // Inyecta el servicio de plantillas
  ) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async sendWelcomeEmail(to: string, name: string) {
    const createdAt = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Define el contexto para la plantilla
    const context = {
      email: to,
      name,
      createdAt,
    };
    // Compila la plantilla
    const html = this.templateService.compileTemplate('welcome', context);

    // Envía el correo electrónico
    try {
      const data = await this.resend.emails.send({
        from: process.env.EMAIL_APP,
        to,
        subject: 'Bienvenido',
        html,
      });

      console.log('Email enviado:', data);
      return data;
    } catch (error) {
      console.error('Error al enviar el email:', error);
      throw error;
    }
  }
}
