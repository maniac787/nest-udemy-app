import { Logger, QueryRunner } from 'typeorm';

export class MyCustomLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.log('QUERY:', query);
    if (parameters && parameters.length) {
      console.log('PARAMETERS:', parameters);
    }
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    console.error('QUERY ERROR:', error);
    console.log('QUERY:', query);
    if (parameters && parameters.length) {
      console.log('PARAMETERS:', parameters);
    }
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    console.warn('SLOW QUERY:', query, 'TIME:', time);
    if (parameters && parameters.length) {
      console.log('PARAMETERS:', parameters);
    }
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    console.log('SCHEMA BUILD:', message);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    console.log('MIGRATION:', message);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    console.log(level.toUpperCase() + ':', message);
  }
}
