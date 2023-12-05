import { useState, useEffect, ChangeEvent } from 'react';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';

// Updates title from any component
export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  });
};

// Manage data from forms
export const useForm = <T>(initialState: T) => {
  const [formState, setFormState] = useState<T>(initialState);

  const updateForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return { ...formState, updateForm, resetForm };
};


// Built in Hooks from redux toolkit
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
