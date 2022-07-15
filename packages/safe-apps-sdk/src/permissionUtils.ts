import { Methods } from './communication';
import { Permission, PermissionsError, PERMISSIONS_REQUEST_REJECTED } from './types/permissions';
import { Wallet } from './wallet';

const comparePermissions = (required: Methods, current: Permission[]): boolean => {
  return !!current.find((p) => p.parentCapability === required);
};

export function requirePermission() {
  return function (_: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // @ts-expect-error this is bound to PropertyDescriptor instead Safe instance
      const wallet = new Wallet(this.communicator);

      console.log('1.Wallet instance:', wallet);
      // @ts-expect-error error
      console.log('2.Communicator instance:', this.communicator);

      let currentPermissions = await wallet.getPermissions();

      if (!comparePermissions(propertyKey as Methods, currentPermissions)) {
        currentPermissions = await wallet.requestPermissions([{ [propertyKey as Methods]: {} }]);
      }

      if (!comparePermissions(propertyKey as Methods, currentPermissions)) {
        throw new PermissionsError('Permissions rejected', PERMISSIONS_REQUEST_REJECTED);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
