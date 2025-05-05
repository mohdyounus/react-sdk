import {
  Input,
  FieldValueList,
  Text,
  EmailDisplay,
  PhoneDisplay,
  URLDisplay,
  withConfiguration
} from '@pega/cosmos-react-core';

import type { PConnFieldProps } from './PConnProps';
import './create-nonce';

import StyledWktaapConstltnLibBigNameWrapper from './styles';

// interface for props
interface WktaapConstltnLibBigNameProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  isTableFormatter?: boolean;
  formatter: string;
  variant?: any;
}

// interface for StateProps object
interface StateProps {
  value: string;
  hasSuggestions: boolean;
}

export const formatExists = (formatterVal: string) => {
  const formatterValues = [
    'TextInput',
    'WorkStatus',
    'RichText',
    'Email',
    'Phone',
    'URL',
    'Operator'
  ];
  let isformatter = false;
  if (formatterValues.includes(formatterVal)) {
    isformatter = true;
  }
  return isformatter;
};

export const textFormatter = (formatter: string, value: string) => {
  let displayComponent: any = null;
  switch (formatter) {
    case 'TextInput': {
      displayComponent = value;
      break;
    }
    case 'Email': {
      displayComponent = <EmailDisplay value={value} displayText={value} variant='link' />;
      break;
    }
    case 'Phone': {
      displayComponent = <PhoneDisplay value={value} variant='link' />;
      break;
    }
    case 'URL': {
      displayComponent = (
        <URLDisplay target='_blank' value={value} displayText={value} variant='link' />
      );
      break;
    }
    // no default
  }
  return displayComponent;
};

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function WktaapConstltnLibBigName(props: WktaapConstltnLibBigNameProps) {
  const { getPConnect, value, placeholder, disabled = false, displayMode, readOnly = false, required = false, label, hideLabel = false, testId, isTableFormatter = false, variant = 'inline' } = props;

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps() as StateProps;
  const propName: string = stateProps.value;
  const { formatter } = props;

  const handleOnChange = (event: any) => {
    const { value: updatedValue } = event.target;
    actions.updateFieldValue(propName, updatedValue);
  };

  if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
    let displayComp = value || <span aria-hidden='true'>&ndash;&ndash;</span>;
    if (isTableFormatter && formatExists(formatter)) {
      displayComp = textFormatter(formatter, value);
    }
    return displayMode === 'DISPLAY_ONLY' ? (
      <StyledWktaapConstltnLibBigNameWrapper> {displayComp} </StyledWktaapConstltnLibBigNameWrapper>
    ) : (
      <StyledWktaapConstltnLibBigNameWrapper>
        <FieldValueList
          variant={hideLabel ? 'stacked' : variant}
          data-testid={testId}
          fields={[{ id: '1', name: hideLabel ? '' : label, value: displayComp }]}
        />
      </StyledWktaapConstltnLibBigNameWrapper>
    );
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    const isValDefined = typeof value !== 'undefined' && value !== '';
    const val = isValDefined ? (
      <Text variant='h1' as='span'>
        {value}
      </Text>
    ) : (
      ''
    );
    return (
      <StyledWktaapConstltnLibBigNameWrapper>
        <FieldValueList
          variant='stacked'
          data-testid={testId}
          fields={[{ id: '2', name: hideLabel ? '' : label, value: val }]}
        />
      </StyledWktaapConstltnLibBigNameWrapper>
    );
  }

  return (
    <StyledWktaapConstltnLibBigNameWrapper>
      <Input
        type='text'
        value={value}
        label={label}
        labelHidden={hideLabel}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        onChange={handleOnChange}
        testId={testId}
      />
    </StyledWktaapConstltnLibBigNameWrapper>
  );
};


export default withConfiguration(WktaapConstltnLibBigName);
