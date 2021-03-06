import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, ModalCloseButton, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from '../InputField';
import { PasswordInputField } from '../general/InputField';
import { AlertError } from '../general/AlertError';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface ModalAuthProps {
  isOpen: boolean
  onClose: any
  onOpen: any
  view: number
}

const VIEWS = {
  LOGIN: 1,
  SIGNUP: 2,
  FORGOT_PASSWORD: 3
};

export const ModalAuth: React.FC<ModalAuthProps> = ({ isOpen, onClose, onOpen, view }) => {
  // state
  const [tab, setTab] = useState(view);

  useEffect(() => {
    setTab(view);
  }, [view])
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        { VIEWS.LOGIN === tab && <LoginForm setTab={setTab} onClose={onClose} /> }
        { VIEWS.SIGNUP === tab && <SignupForm setTab={setTab} onClose={onClose} /> }
        { VIEWS.FORGOT_PASSWORD === tab && <LoginForm setTab={setTab} onClose={onClose} /> }
      </ModalContent>
    </Modal>
  );
}