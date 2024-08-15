import { SetMetadata } from '@nestjs/common';

export enum Role {
  ClientUser = 'client-user',
  ClientAdmin = 'client-admin',
  BookkeeperUser = 'bookkeeper-user',
  BookkeeperAdmin = 'bookkeeper-admin',
}

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
