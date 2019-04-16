import React from 'react';
import { storiesOf } from '@storybook/react';
import Form from 'src/components/Form/Form';
import { ON_SUBMIT, ON_COMPLETE, FormDecorator } from 'src/utils/utils';
import 'antd/dist/antd.css';

const FormWrapper = ({ fields, ...props }) => (
  <Form
    {...props}
    fields={fields}
    onSubmit={ON_SUBMIT}
    onComplete={ON_COMPLETE}
  />
);

storiesOf('Form [mode=default]', module)
  .addDecorator(FormDecorator)
  .add('Basic Text Input', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'name',
        placeholder: 'Name',
        type: 'string',
      },
    ];
    return <FormWrapper fields={fields} />;
  })
  .add('Text Input with Validation', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'name',
        value: '',
        placeholder: 'Name',
        type: 'string',
        validation: [
          { min: 2, msg: 'Too Short!' },
          { max: 20, msg: 'Too Long!' },
          { required: true, msg: 'Required!!' },
        ],
      },
    ];
    return <FormWrapper fields={fields} />;
  })
  .add('Text Input with Default Value', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'name',
        value: 'Codelab',
        placeholder: 'Name',
        type: 'string',
      },
    ];
    return <FormWrapper fields={fields} />;
  });

storiesOf('Submit Button', module)
  .addDecorator(FormDecorator)
  .add('custom submit text', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'name',
        placeholder: 'Name',
        type: 'string',
      },
    ];
    return (
      <FormWrapper submitButton={{ text: 'Custom Text' }} fields={fields} />
    );
  })
  .add('hidden submit button ', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'name',
        value: 'Some Value',
      },
    ];
    return (
      <FormWrapper
        submitButton={{
          hide: true,
        }}
        fields={fields}
      />
    );
  });

storiesOf('Form Attributes', module)
  .addDecorator(FormDecorator)
  .add('hidden input', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'name',
        value: 'Some Value',
        attributes: { hidden: true },
      },
    ];
    return <FormWrapper fields={fields} />;
  })
  .add('with sync fields', () => {
    const fields = [
      {
        name: 'inputA',
        inputType: 'text',
        value: '',
      },
      {
        name: 'inputB',
        inputType: 'text',
        value: '',
        attributes: {
          sync: 'inputA', // Syncs to target field name's value
        },
      },
    ];
    return <FormWrapper fields={fields} />;
  })
  .add('with mixed input type', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'name',
        value: 'fixed', //
        placeholder: 'Model Name',
        validation: [
          { min: 2, msg: 'Too Short!' },
          { max: 20, msg: 'Too Long!' },
          { required: true, msg: 'Required!!' },
        ],
        attributes: {
          id: 'name',
        },
      },
      {
        inputType: 'password',
        name: 'password',
        value: '',
        placeholder: 'Enter Password:',
      },
      {
        inputType: 'textarea',
        name: 'message',
        value: 'are we one?',
        placeholder: 'Leave a message',
        validation: [
          // { min: 2, msg: 'Too Short!' },
          // { max: 20, msg: 'Too Long!' },
          { required: true, msg: 'Required!!' },
        ],
      },
      // Checkbox
      {
        inputType: 'checkbox',
        name: 'gender',
        label: 'Is Male? (check box)',
        value: 1,
        placeholder: '',
        style: 'grid',
        // validation: [
        //   // { required: true, msg: 'Required!!' }
        // ],
      },
      {
        inputType: 'radio',
        // style="grid"  <--- you will add this,
        name: 'os',
        label: 'which mobile OSs  are you using?',
        style: 'grid',
        options: [
          {
            label: 'IOS',
            value: '1',
            col: 24,
          },
          {
            label: 'Android',
            value: '2',
            col: 24,
          },
          {
            label: 'Other',
            value: '3',
            col: 24,
          },
        ],
        value: '1',
        placeholder: '',
        validation: [
          // { required: true, msg: 'Required!!' }
        ],
      },
      {
        inputType: 'slider',
        defaultValue: 0.25,
        max: 1,
        min: 0,
        type: 'string',
        label: 'Basic Slider',
        name: 'slider_value',
        step: 0.1,
        validation: [],
      },
      {
        inputType: 'select',
        name: 'os_type',
        label: 'which mobile OSs are you using?',
        defaultValue: '1',
        // style: "grid",
        options: [
          {
            label: 'IOS',
            value: '1',
          },
          {
            label: 'Android',
            value: '2',
          },
          {
            label: 'Other',
            value: '3',
          },
        ],
        defaultChecked: true,
        validation: [
          // { required: true, msg: 'Required!!' }
        ],
      },
      {
        inputType: 'datetime',
        name: 'birthday',
        value: '1994-05-05',
      },
      {
        inputType: 'color',
        name: 'background',
        value: '#fff',
      },
    ];
    return (
      <>
        <Form
          fields={fields}
          onSubmit={ON_SUBMIT}
          onComplete={ON_COMPLETE}
          submitButton={{ text: 'Click me' }}
        />
      </>
    );
  })
  // .add('dynamic generate field', () => <GenerationForm />)
  .add('render props form', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'myUsername',
      },
      {
        inputType: 'color',
        name: 'background',
        value: '#fff',
      },
      {
        inputType: 'number',
        name: 'counter',
        value: '1',
      },
    ];

    return (
      <Form
        mode="renderProps"
        fields={fields}
        onSubmit={ON_SUBMIT}
        onComplete={ON_COMPLETE}
      >
        {({ FormFields, Fields, FormButton, ...rest }) => {
          console.log({ rest }); // tslint:disable-line
          return (
            <div>
              <FormFields Fields={Fields} className={''} />
              <FormButton isSubmitting={() => {}} handleSubmit={() => {}}>
                Click me
              </FormButton>
            </div>
          );
        }}
      </Form>
    );
  });

storiesOf('Form Layout', module)
  .addDecorator(FormDecorator)
  .add('2 column layout with label', () => {
    const fields = [
      {
        name: 'firstName',
        inputType: 'text',
        placeholder: 'John',
        label: 'First Name',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            sm: 5,
          },
        },
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        name: 'right',
        inputType: 'text',
        placeholder: 'right',
        label: 'right',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            sm: 5,
          },
        },
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        name: 'bottom',
        inputType: 'text',
        placeholder: 'bottom',
        label: 'bottom',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            sm: 5,
          },
        },
      },
      {
        name: 'left',
        inputType: 'text',
        placeholder: 'left',
        label: 'left',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            sm: 5,
          },
        },
      },
    ];
    return (
      <Form
        fields={fields}
        onSubmit={() =>
          new Promise(resolve => {
            setTimeout(() => {
              console.log('submitting'), resolve();
            }, 1000);
          })
        }
      />
    );
  })
  .add('Form inline', () => {
    const fields = [
      {
        name: 'first_name',
        inputType: 'text',
        placeholder: 'First Name',
        label: 'FirstName',
        layout: {
          labelLayout: {
            sm: 10,
          },
        },
      },
      {
        name: 'last_name',
        inputType: 'text',
        placeholder: 'Last Name',
        label: 'LastName',
        layout: {
          labelLayout: {
            sm: 10,
          },
        },
      },
    ];
    return (
      <>
        <FormWrapper
          fields={fields}
          submitButton={{ text: 'Register' }}
          layout="inline"
        />
      </>
    );
  });

storiesOf('Custom Fields Form', module)
  .addDecorator(FormDecorator)
  .add('fields with custom fields index ', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'input_0',
        type: 'string',
        label: 'Index 0',
      },
      {
        inputType: 'text',
        name: 'input_3',
        type: 'string',
        label: 'Index 3',
      },
    ];
    const customFields = [
      {
        index: 1,
        inputType: 'text',
        name: 'input_1',
        type: 'string',
        label: 'Index 1',
      },
      {
        index: 2,
        inputType: 'text',
        name: 'input_2',
        type: 'string',
        label: 'Index 2',
      },
    ];
    return (
      <Form
        fields={fields}
        customFields={customFields}
        onSubmit={ON_SUBMIT}
        onComplete={ON_COMPLETE}
      />
    );
  });
