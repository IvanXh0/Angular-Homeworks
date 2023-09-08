export type Roles = { [key: string]: boolean };

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  roles: Roles;
}
