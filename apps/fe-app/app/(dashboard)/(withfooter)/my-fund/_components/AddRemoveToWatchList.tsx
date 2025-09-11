'use client';
import {
  useFundsServiceDeleteFundsByFundIdWatchlist,
  useFundsServicePutFundsByFundIdWatchlist,
} from '@openapi';
import { Button, cn } from 'design-system';
import React, { useState } from 'react';

interface AddRemoveToWatchListProps {
  isInWatchListInitialValue: boolean;
  fundId: number;
}

export const AddRemoveToWatchList: React.FC<AddRemoveToWatchListProps> = ({
  isInWatchListInitialValue,
  fundId,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState(isInWatchListInitialValue);

  // mutation
  const addToWatchlist = useFundsServicePutFundsByFundIdWatchlist({
    onSuccess: () => {
      setIsInWatchList(true);
    },
  });

  const removeFromWatchlist = useFundsServiceDeleteFundsByFundIdWatchlist({
    onSuccess: () => {
      setIsInWatchList(false);
    },
  });

  const handleToggleWatchlist = () => {
    if (isInWatchList) {
      removeFromWatchlist.mutate({ fundId });
    } else {
      addToWatchlist.mutate({ fundId });
    }
  };
  return (
    <Button
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => handleToggleWatchlist()}
      className={cn('w-[183px]', { 'w-[150px]': isInWatchList })}
      mode={isInWatchList ? 'secondary' : 'primary'}
      iconRight={
        isInWatchList
          ? isHovering
            ? { name: 'minus', size: 'lg' }
            : { name: 'check', size: 'lg' }
          : { name: 'plus', size: 'lg' }
      }
    >
      در دیده بان
    </Button>
  );
};
