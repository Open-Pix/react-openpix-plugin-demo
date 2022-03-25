import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Flex } from 'rebass';
import { v4 as uuidv4 } from 'uuid';
import { space } from 'styled-system';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';

import { useOpenPix } from './useOpenPix';

export const getDefaultTransactionId = () =>
  uuidv4().toString().replace(/-/g, '');

const App = () => {
  // generate a new transactionID on mount
  const [correlationID, setCorrelationID] = useState(() =>
    getDefaultTransactionId(),
  );

  useOpenPix();

  const onClick = () => {
    window.$openpix.push([
      'pix',
      {
        value: 1,
        correlationID,
        description: 'OpenPix Demo',
      },
    ]);
  };

  const isOpenPixLoaded = !!window.$openpix && !!window.$openpix.push;

  useEffect(() => {
    if (isOpenPixLoaded) {
      const logEvents = (e) => {
        // eslint-disable-next-line
        console.log('logEvents: ', e);

        if (e.type === 'PAYMENT_STATUS') {
          if (e.data.status === 'COMPLETED') {
            setCorrelationID(getDefaultTransactionId());
          }
        }
      };

      const unsubscribe = window.$openpix.addEventListener(logEvents);

      return () => {
        unsubscribe && unsubscribe();
      };
    }
  }, [isOpenPixLoaded]);

  return (
    <Flex
      mt='80px'
      mb='80px'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      minHeight='250px'
    >
      <span>Open Pix Demo</span>
      <Button
        variant='outlined'
        color='primary'
        onClick={onClick}
        endIcon={<ShoppingCartIcon />}
      >
        Pay with Pix
      </Button>
    </Flex>
  );
};

export default App;
