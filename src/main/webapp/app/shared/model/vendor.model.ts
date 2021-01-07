import { IContract } from 'app/shared/model/contract.model';

export interface IVendor {
  id?: number;
  name?: string;
  email?: string;
  contracts?: IContract[];
}

export const defaultValue: Readonly<IVendor> = {};
