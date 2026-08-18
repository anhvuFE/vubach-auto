import { SetMetadata } from '@nestjs/common';
import type { UserRole } from '@vubach/shared';

/** Metadata key under which required roles are stored on a route handler. */
export const ROLES_KEY = 'roles';

/**
 * Restrict a route to the given roles. Used together with RolesGuard, e.g.
 * `@Roles('ADMIN')` on a handler already protected by JwtAuthGuard.
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
