import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './contract.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContractProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Contract = (props: IContractProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { contractList, match, loading } = props;
  return (
    <div>
      <h2 id="contract-heading">
        <Translate contentKey="task0App.contract.home.title">Contracts</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="task0App.contract.home.createLabel">Create new Contract</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {contractList && contractList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="task0App.contract.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="task0App.contract.vendor">Vendor</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contractList.map((contract, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${contract.id}`} color="link" size="sm">
                      {contract.id}
                    </Button>
                  </td>
                  <td>{contract.title}</td>
                  <td>{contract.vendor ? <Link to={`vendor/${contract.vendor.id}`}>{contract.vendor.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${contract.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contract.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contract.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="task0App.contract.home.notFound">No Contracts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ contract }: IRootState) => ({
  contractList: contract.entities,
  loading: contract.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Contract);
