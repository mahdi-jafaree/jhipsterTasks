import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVendor } from 'app/shared/model/vendor.model';
import { getEntities as getVendors } from 'app/entities/vendor/vendor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './contract.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContractUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContractUpdate = (props: IContractUpdateProps) => {
  const [vendorId, setVendorId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { contractEntity, vendors, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/contract');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVendors();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...contractEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="task0App.contract.home.createOrEditLabel">
            <Translate contentKey="task0App.contract.home.createOrEditLabel">Create or edit a Contract</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : contractEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="contract-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="contract-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="contract-title">
                  <Translate contentKey="task0App.contract.title">Title</Translate>
                </Label>
                <AvField id="contract-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label for="contract-vendor">
                  <Translate contentKey="task0App.contract.vendor">Vendor</Translate>
                </Label>
                <AvInput id="contract-vendor" type="select" className="form-control" name="vendor.id">
                  <option value="" key="0" />
                  {vendors
                    ? vendors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/contract" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  vendors: storeState.vendor.entities,
  contractEntity: storeState.contract.entity,
  loading: storeState.contract.loading,
  updating: storeState.contract.updating,
  updateSuccess: storeState.contract.updateSuccess,
});

const mapDispatchToProps = {
  getVendors,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContractUpdate);
