export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string; // Formato YYYY-MM-DD
  role: 'GUEST' | 'HOST';
}
