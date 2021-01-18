import React, { useState, InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

// type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
//   label: string;
//   name: string;
//   errors?: string
// };

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & InputProps & TextareaProps & {
  label: string;
  name: string;
  errors?: string
  inputSize?: string
};


// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({ label, errors, inputSize = 'md', ...props }) => {
  const [field, { error, touched }] = useField(props);
  return (
    <FormControl isInvalid={!!(touched && error)}>
      <FormLabel fontWeight='bold' fontSize='sm' htmlFor={field.name}>{label}</FormLabel>
      <Input size={inputSize} {...field} {...props} id={field.name} />
      {(touched && error) ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export const TextareaField: React.FC<InputFieldProps> = ({ label, errors, inputSize = 'md', ...props }) => {
  const [field, { error, touched }] = useField(props);
  return (
    <FormControl isInvalid={!!(touched && error)}>
      <FormLabel fontWeight='bold' fontSize='sm' htmlFor={field.name}>{label}</FormLabel>
      <Textarea size={inputSize} {...field} {...props} id={field.name} />
      {(touched && error) ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export const PasswordInputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error, touched }] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl isInvalid={!!(touched && error)}>
      <FormLabel htmlFor="description" fontSize='sm' fontWeight='bold'>Contraseña</FormLabel>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          {...field}
          {...props} id={field.name}
        />
        <InputRightElement>
          <IconButton aria-label="Search database" variant='ghost' icon={!showPassword ? AiFillEye({}) : AiFillEyeInvisible({})} onClick={() => setShowPassword(!showPassword)} />
        </InputRightElement>
      </InputGroup>
      {(touched && error) ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
