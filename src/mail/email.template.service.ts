import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as process from 'node:process';

@Injectable()
export class EmailTemplateService {
  compileTemplate(templateName: string, context: any): string {
    // Lee el archivo de la plantilla
    console.log('__DIR_NAME__', __dirname);
    const templatePath = `${process.env.TEMPLATE_EMAIL_REG}/${templateName}.hbs`;
    // const templatePath = `${__dirname}/templates/${templateName}.hbs`;
    const templateSource = fs.readFileSync(templatePath, 'utf8');

    // Compila la plantilla
    const template = handlebars.compile(templateSource);
    return template(context);
  }
}
