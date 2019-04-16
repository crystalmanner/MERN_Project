import React from 'react';
import withPage from 'src/hoc/_withPage';
import ModelListLayout, {
  ModelDetailLink,
  ModelEditLink,
  ModelList,
  ModelCreateButton,
} from 'src/modules/Model/components/Model-list--layout';
import ModelDeleteButton from 'src/modules/Model/components/Model-delete--button';
import { Mutation } from 'react-apollo';
import Query from 'src/utils/Query';
import ModelDeleteModal from 'src/modules/Model/components/Model-delete--modal';
import { deleteMutation } from 'src/modules/Model/data/Model-container';
import { Compose, Toggle, Value } from 'react-powerplug';
import Model from '../../src/modules/Model/data/Model';
import { ModelPageCreate } from 'pages/model/create';
import { ModelUpdatePage } from 'pages/model/update';
import ModalUserRegister from 'src/modules/User/Modal-user--register';
import withPageProps from 'src/hoc/withPageProps';

const ComposePowerPlug: any = Compose;
const ValuePowerPlug: any = Value;

const List = ({ data, toggle, set }) => (
  <ModelList models={data.listModels.items}>
    {model => {
      return (
        <>
          <ModelDetailLink model={model} />
          <ModelEditLink model={model} />
          <ModelDeleteButton
            onDelete={() => {
              set(model.id);
              toggle.toggle();
            }}
          />
        </>
      );
    }}
  </ModelList>
);

const RegisterModal = () => (
  <ComposePowerPlug components={[Toggle, <ValuePowerPlug initial={0} />]}>
    {(toggle, { value, set }) => <ModalUserRegister visible={value} />}
  </ComposePowerPlug>
);

const ModelIndex = props => {
  return (
    <>
      {/* <ModalUserRegister visible={value} /> */}
      <ModelPageCreate {...props} />
      <ModelUpdatePage {...props} />
      {/* <SidebarCreateLayout /> */}

      <Query query={Model.listModels}>
        {data => (
          <ComposePowerPlug
            components={[Toggle, <ValuePowerPlug initial={0} />]}
          >
            {(toggle, { value, set }) => (
              // Layout for the model list
              <ModelListLayout
                Create={ModelCreateButton}
                List={() => <List toggle={toggle} data={data} set={set} />}
                DeleteModal={() => (
                  <Mutation
                    mutation={Model.deleteModel}
                    refetchQueries={[Model.LIST_MODELS]}
                    awaitRefetchQueries={true}
                  >
                    {(deleteModel, { data }) => (
                      <ModelDeleteModal
                        handleOk={() => deleteMutation(deleteModel, value)}
                        handleCancel={toggle.toggle}
                        visible={toggle.on}
                      />
                    )}
                  </Mutation>
                )}
              />
            )}
          </ComposePowerPlug>
        )}
      </Query>
    </>
  );
};

export default withPageProps()(ModelIndex);
