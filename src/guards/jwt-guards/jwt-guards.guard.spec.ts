import { JwtGuardsGuard } from './jwt-guards.guard';

describe('JwtGuardsGuard', () => {
  it('should be defined', () => {
    expect(new JwtGuardsGuard()).toBeDefined();
  });
});
