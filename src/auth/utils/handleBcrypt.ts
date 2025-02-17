import * as bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

async function generateHash(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function compareHash(plain: string, hash: string): Promise<any> {
  return await bcrypt.compare(plain, hash);
}

export { generateHash, compareHash };
