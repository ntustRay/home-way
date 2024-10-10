'use client'

import {ReloadIcon} from "@radix-ui/react-icons"
import {useFormStatus} from "react-dom"
import {Button} from "../ui/button"

type SumbitButtonProps = {
  className?: string;
  text: string;
}

export const SubmitButton = ({className = '', text = 'submit'}: SumbitButtonProps) => {
  const {pending} = useFormStatus()
  
  return (
    <Button
      type='submit'
      size='lg'
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