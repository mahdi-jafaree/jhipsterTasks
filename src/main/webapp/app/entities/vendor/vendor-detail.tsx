import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { TabView, TabPanel } from 'primereact/tabview'
import { IRootState } from 'app/shared/reducers';
import { getEntity as getVendorEntity } from './vendor.reducer';
import { getEntities as getContractEntities } from '../contract/contract.reducer'
import { getEntities as getInvoiceEntites } from '../invoice/invoice.reducer'
import { IVendor } from 'app/shared/model/vendor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVendorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const VendorDetail = (props: IVendorDetailProps) => {
  useEffect(() => {
    props.getVendorEntity(props.match.params.id);
    props.getContractEntities();
    props.getInvoiceEntites();

  }, []);
  const vendorData = {
    name: "",
    contracts: { title: "" },
    invoices: { title: "", amount: null as number },
  }
  const { vendorEntity, contractEntities, invoiceEntities } = props;
  const [contracts, setContracts] = useState([])
  const [invoices, setInvoices] = useState([])
  const [vendor, setVendor] = useState(vendorData)
  const [selectedId, setSelectedId] = useState(1)

  useEffect(() => {
    let _tmpList = []
    contractEntities.forEach((el) => _tmpList.unshift(el));
    setContracts(_tmpList);

    _tmpList = []
    invoiceEntities.forEach((el) => _tmpList.unshift(el))
    setInvoices(_tmpList)
  }, [props.contractEntities, props.invoiceEntities])


  const updateInvoices = (id: number) => {
    const _tmpList = props.invoiceEntities.filter((invo, index, arr)=>{
      return (invo.contract!==null && invo.contract.id ===id)
    })
    console.log(_tmpList)
    setInvoices(_tmpList)
  }
  

  return (
    <div>
      <div className="p-grid">
        <div className="p-col-2">
          <h5>ID</h5>
          <h6>{props.vendorEntity.id}</h6>
        </div>
        <div className="p-col-2">
          <h5>Name</h5>
          <h6>{props.vendorEntity.name}</h6>
        </div>
      </div>
      <div className="p-grid">
        <div className="p-col">
          <DataTable value={contracts}
            onRowClick={(event) => { updateInvoices(event.data.id) }}>
            <Column field="title" header="Contracts"></Column>
          </DataTable>
        </div>
        <div className="p-col">
          <DataTable value={invoices}>
            <Column field="title"></Column>
          </DataTable>
        </div>

      </div>


    </div>

  );
};

const mapStateToProps = ({ vendor, contract, invoice }: IRootState) => ({
  vendorEntity: vendor.entity,
  contractEntities: contract.entities,
  invoiceEntities: invoice.entities,
});

const mapDispatchToProps = { getVendorEntity, getContractEntities, getInvoiceEntites };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VendorDetail);
