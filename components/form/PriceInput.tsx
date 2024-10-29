import React from 'react';
import {Label} from '../ui/label';
import {Input} from '../ui/input';
import { Prisma } from '@prisma/client';



type PriceInputProps = {
  defaultValue?: number;
}

const PriceInput = ({defaultValue}: PriceInputProps) => {
  const name = 'price';
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className="capitalize">
        Price ($)
      </Label>
      <Input
        id={name}
        name={name}
        type="number"
        min={0}
        defaultValue={defaultValue || 100}
      />
    </div >
  );
}

export default PriceInput;
