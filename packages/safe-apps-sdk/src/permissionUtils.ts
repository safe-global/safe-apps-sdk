import { Methods } from './communication';
import { Permission, PermissionsError, PERMISSIONS_REQUEST_REJECTED } from './types/permissions';
import { Wallet } from './wallet';

const hasPermission = (required: Methods, permissions: Permission[]): boolean => {
  console.log('hasPermission', required, permissions);
  return permissions.some((permission) => permission.parentCapability === required);
};

export function requirePermission() {
  return function (_: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // @ts-expect-error this is bound to PropertyDescriptor instead Safe instance
      const wallet = new Wallet(this.communicator);

      let currentPermissions = await wallet.getPermissions();

      if (!hasPermission(propertyKey as Methods, currentPermissions)) {
        currentPermissions = await wallet.requestPermissions([{ [propertyKey as Methods]: {} }]);
      }

      if (!hasPermission(propertyKey as Methods, currentPermissions)) {
        throw new PermissionsError('Permissions rejected', PERMISSIONS_REQUEST_REJECTED);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
