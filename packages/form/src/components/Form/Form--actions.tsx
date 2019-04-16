import React from 'react';

const mergeOrderedFields = ({ customFields = [], fields }) => {
  const mergedFields = Object.assign([], fields);

  for (const field of customFields) {
    if ((field as any).index && (field as any).index <= fields.length) {
      mergedFields.splice((field as any).index, 0, field);
    } else {
      mergedFields.push(field);
    }
  }

  return mergedFields;
};

const createHandleSubmitFromMutation = ({
  client,
  mutation,
  onSubmit,
  onComplete,
}) => {
  let mutate: ({ variables }) => Promise<any> = () => Promise.resolve();
  if (mutation) {
    mutate = ({ variables }) => {
      return client!.mutate({
        mutation,
        variables,
      });
    };
  }

  const handleSubmit = (values: any, props: any) => {
    props.setSubmitting(true);
    onSubmit(values, { mutate }).then(async () => {
      await onComplete();
      props.setSubmitting(false);
    });
  };

  return handleSubmit;
};

export { mergeOrderedFields, createHandleSubmitFromMutation };
