import { mountForm } from 'src/utils/utils';
import { Radio } from 'antd';

/**
 * Radio Group
 */
describe('Radio Group', () => {
  const field = {
    inputType: 'radio',
    name: 'OS',
    label: 'which mobile OSs are you using?',
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
    value: '1',
  };

  const formWrapper = mountForm({ fields: [field], submitOnChange: true });
  const RadioWrapper = formWrapper.find('RadioGroup').first();

  it('has the correct default value', () => {
    expect(RadioWrapper.props()).toMatchObject({
      value: field.value,
    });
  });

  it('has the correct name attribute', () => {
    expect(RadioWrapper.props()).toMatchObject({
      name: field.name,
    });
  });

  it('has enough options', () => {
    expect(RadioWrapper.find(Radio)).toHaveLength(field.options.length);
  });

  // TODO: #69 Add test for submitOnChange
  // it("submits on change", () => {
  //   expect(RadioWrapper.find(Radio)).toHaveLength(field.options.length);
  // });
});
