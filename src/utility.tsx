export function accessNestedArray(
  nestedArray: Array<any>,
  keyChain: Array<number>
): any {
  return keyChain.reduce((arr: any, index: number) => {
    return arr && arr.length > index ? arr[index] : null;
  }, nestedArray);
}
