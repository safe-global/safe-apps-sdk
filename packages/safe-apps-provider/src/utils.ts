export function getLowerCase(value: string): string {
  if (value) {
    return value.toLowerCase();
  }
  return value;
}

export function numberToHex(value: number): `0x${string}` {
  return `0x${value.toString(16)}`;
}
