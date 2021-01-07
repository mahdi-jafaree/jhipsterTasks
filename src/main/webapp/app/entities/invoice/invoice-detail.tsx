import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceDetail = (props: IInvoiceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { invoiceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="task0App.invoice.detail.title">Invoice</Translate> [<b>{invoiceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="task0App.invoice.title">Title</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.title}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="task0App.invoice.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.amount}</dd>
          <dt>
            <Translate contentKey="task0App.invoice.contract">Contract</Translate>
          </dt>
          <dd>{invoiceEntity.contract ? invoiceEntity.contract.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/invoice" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice/${invoiceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ invoice }: IRootState) => ({
  invoiceEntity: invoice.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);
