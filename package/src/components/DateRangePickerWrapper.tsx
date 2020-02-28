/* eslint-disable jsx-a11y/no-static-element-interactions */

import * as React from 'react';
import {
  createStyles,
  withStyles,
  // eslint-disable-next-line no-unused-vars
  WithStyles,
} from '@material-ui/core';

// eslint-disable-next-line no-unused-vars
import { DateRange, DefinedRange } from '../types';

import DateRangePicker from './DateRangePicker';

const styles = () => createStyles({
  dateRangePickerContainer: {
    position: 'relative',
  },
  dateRangePicker: {
    position: 'relative',
    zIndex: 1,
  },
  dateRangeBackdrop: {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    bottom: 0,
    zIndex: 0,
    right: 0,
    left: 0,
    top: 0,
  },
});

interface DateRangePickerWrapperProps extends WithStyles<typeof styles> {
  open: boolean;
  toggle: () => void;
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange: (dateRange: DateRange) => void;
  closeOnClickOutside?: boolean;
}

const DateRangePickerWrapper: React.FunctionComponent<DateRangePickerWrapperProps> = (
  props: DateRangePickerWrapperProps,
) => {
  const hasFixedCss = React.useRef(false);

  const {
    closeOnClickOutside,
    classes,
    toggle,
    open,
  } = props;

  const handleToggle = () => {
    if (closeOnClickOutside === false) {
      return;
    }

    toggle();
  };

  const handleKeyPress = (event: any) => event?.key === 'Escape' && handleToggle();

  React.useEffect(() => {
    if (open && !hasFixedCss.current) {
      hasFixedCss.current = true;
      toggle();
    }
  }, [
    open,
  ]);

  // Force inject CSS into page after loading - to avoid conflicts with other Material UI versions.
  React.useEffect(() => {
    if (!open) {
      toggle();
    }
  }, []);

  return (
    <div className={classes.dateRangePickerContainer}>
      {
        open && (
          <div
            className={classes.dateRangeBackdrop}
            onKeyPress={handleKeyPress}
            onClick={handleToggle}
          />
        )
      }

      <div className={classes.dateRangePicker}>
        <DateRangePicker {...props} />
      </div>
    </div>
  );
};

export default withStyles(styles)(DateRangePickerWrapper);