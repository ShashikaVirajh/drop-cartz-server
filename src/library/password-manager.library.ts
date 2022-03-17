import bcrypt from 'bcryptjs';

export class PasswordManager {
  static toHash = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  static compare = async (password: string, encryptedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, encryptedPassword);
  };
}
