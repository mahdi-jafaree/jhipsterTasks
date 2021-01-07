import { IInvoice } from 'app/shared/model/invoice.model';
import { IVendor } from 'app/shared/model/vendor.model';

export interface IContract {
  id?: number;
  title?: string;
  invoices?: IInvoice[];
  vendor?: IVendor;
}

export const defaultValue: Readonly<IContract> = {};
