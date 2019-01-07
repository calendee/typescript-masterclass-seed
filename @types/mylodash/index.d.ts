import * as lodash from 'lodash';
declare module 'lodash' {
  // Merge the declarations of the interface
  // Called an "ambient module"
  interface LoDashStatic {
    log(item: string): void;
  }
}