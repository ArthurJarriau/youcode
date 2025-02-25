"use client";
import {  useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '@/components/ui/button';

// Composant enfant qui utilise useFormStatus
export const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();
  return <Button {...props} disabled={pending} />;
};