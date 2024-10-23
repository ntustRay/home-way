'use client'

import {ReloadIcon} from "@radix-ui/react-icons"
import {useFormStatus} from "react-dom"
import {Button} from "../ui/button"

type btnSize = 'default' | 'lg' | 'sm';

type SumbitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
}

export const SubmitButton = ({
  className = '',
  text = 'submit',
  size = 'lg',
}: SumbitButtonProps) => {
  const {pending} = useFormStatus()

  return (
    <Button
      type='submit'
      size={size}
      className={`capitalize ${className}`}
      disabled={pending}
    >
      {pending ? (
        <>
          <ReloadIcon className='mr-2 w-4 h-4 animate-spin' />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  )
}