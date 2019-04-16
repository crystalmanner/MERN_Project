import { mountForm } from 'src/utils/utils';

describe('Select', () => {
  const field = {
    inputType: 'select',
    name: 'OS_select',
    label: 'which mobile OSs are you using?',
    defaultValue: '1',
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
  };

  const formWrapper = mountForm({ fields: [field] });
  const SelectWrapper = formWrapper.find('Select').first();

  it('has the correct default value', () => {
    expect(SelectWrapper.props()).toMatchObject({
      defaultValue: field.defaultValue,
    });
  });

  // it('has the correct name attribute', () => {
  //   expect(SelectWrapper.props()).toMatchObject({
  //     name: field.name,
  //   });
  // });

  it('has enough options', () => {
    expect(SelectWrapper.props().children.length).toBe(field.options.length);
  });
});
