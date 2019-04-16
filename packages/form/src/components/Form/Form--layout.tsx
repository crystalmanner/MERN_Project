import React from 'react';
import { get, findIndex } from 'lodash';
import { Col, Row } from 'antd';
import { InputLabel } from 'src/components/Input/Input';

interface Layout {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  // push?: number;
  // pull?: number;
}

export interface InputLayout {
  wrapperLayout: Layout;
  labelLayout?: Layout;
}

const getInnerInputLayout = span => (span === 24 ? 24 : 24 - span);

const getFormLayout = layout => {
  const wrapperLayout: any = get(layout, 'wrapperLayout', {});
  const labelLayout: any = get(layout, 'labelLayout', {});
  const inputLayout = {
    xs: getInnerInputLayout(labelLayout.xs),
    sm: getInnerInputLayout(labelLayout.sm),
    md: getInnerInputLayout(labelLayout.md),
    lg: getInnerInputLayout(labelLayout.lg),
    xl: getInnerInputLayout(labelLayout.xl),
  };

  return {
    wrapperLayout,
    labelLayout,
    inputLayout,
  };
};

const isRequired = validation => findIndex(validation, { required: true }) > -1;

const initialValues = fields => {
  const values = fields.reduce(
    (acc, field) =>
      Object.assign(acc, {
        [field.name]: field.value || field.defaultValue || field.defaultChecked,
      }),
    {},
  );
  return values;
};

const FieldLayout = ({
  layout,
  name,
  id,
  label,
  validation,
  children,
  className,
}) => {
  const { wrapperLayout, labelLayout, inputLayout } = getFormLayout(layout);

  return (
    <div className={className}>
      <Col key={name} {...wrapperLayout} span={24}>
        <Row>
          {label && (
            <Col {...labelLayout} span={4}>
              <InputLabel
                label={label}
                isRequired={isRequired(validation)}
                id={id || name}
              />
            </Col>
          )}
          <Col {...inputLayout} span={label ? 20 : 24}>
            {children}
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export { getFormLayout, isRequired, FieldLayout, initialValues };
