import PostMessageCommunicator, { Methods } from './communication';
import { Safe } from './safe';
import { Permission, PermissionsError, PERMISSIONS_REQUEST_REJECTED } from './types/permissions';
import { Wallet } from './wallet';

const comparePermissions = (current: Permission[], required: Methods[]): boolean => {
  console.log('3.comparePermissions:', current, required);
  return required.every((method: Methods) => {
    return !!current.find((p) => p.parentCapability === method);
  });
};

export function requirePermission() {
  return function (_: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // @ts-expect-error this is not recognized as the correct context
      const wallet = new Wallet(this.communicator);

      console.log('1.Wallet instance:', wallet);
      // @ts-expect-error method is private but we are testing it
      console.log('2.Communicator instance:', this.communicator);

      let currentPermissions = await wallet.getPermissions();

      if (!comparePermissions(currentPermissions, [propertyKey as Methods])) {
        currentPermissions = await wallet.requestPermissions([{ [propertyKey as Methods]: {} }]);
      }

      if (!comparePermissions(currentPermissions, [propertyKey as Methods])) {
        throw new PermissionsError('Permissions rejected', PERMISSIONS_REQUEST_REJECTED);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
