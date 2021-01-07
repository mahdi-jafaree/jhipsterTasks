import { IContract } from 'app/shared/model/contract.model';

export interface IInvoice {
  id?: number;
  title?: string;
  amount?: number;
  contract?: IContract;
}

export const defaultValue: Readonly<IInvoice> = {};
