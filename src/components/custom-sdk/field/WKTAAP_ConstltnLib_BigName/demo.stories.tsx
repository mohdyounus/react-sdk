import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import WktaapConstltnLibBigName from './index';
import { configProps } from './mock';

const meta: Meta<typeof WktaapConstltnLibBigName> = {
  title: 'WktaapConstltnLibBigName',
  component: WktaapConstltnLibBigName,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof WktaapConstltnLibBigName>;

export const BaseWktaapConstltnLibBigName: Story = args => {
  const [value, setValue] = useState(configProps.value);

  const props = {
    value,
    placeholder: configProps.placeholder,
    getPConnect: () => {
      return {
        getActionsApi: () => {
          return {
            updateFieldValue: (propName, theValue) => {
              setValue(theValue);
            }
          };
        },
        getStateProps: () => {
          return { value: '.name' };
        }
      };
    },
    onChange: event => {
      setValue(event.target.value);
    },
    onBlur: () => {
      return configProps.value;
    }
  };

  return <WktaapConstltnLibBigName {...props} {...args} />;
};

BaseWktaapConstltnLibBigName.args = {
  label: configProps.label,
  helperText: configProps.helperText,
  testId: configProps.testId,
  readOnly: configProps.readOnly,
  disabled: configProps.disabled,
  required: configProps.required,
  status: configProps.status,
  hideLabel: configProps.hideLabel,
  displayMode: configProps.displayMode,
  validatemessage: configProps.validatemessage
};
