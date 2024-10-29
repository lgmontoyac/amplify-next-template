import { Button, TextField } from '@aws-amplify/ui-react';
import Modal from './../Modal/Modal';
import Stepper from './../Stepper/Stepper';
import { DataForm } from '../DataForm/DataForm';
import { ContactDetailsForm } from '../ContactDetailsForm/ContactDetailsForm';
import { DealerForm } from '../DealerForm/DealerForm';
import { useState } from 'react';
import { ShippingConfirmation } from '../ShippingConfirmation/ShippingConfirmation';

interface ModalWithStepperProps {
  isOpen: boolean;
  onClose: () => void;
}

type StepKey = 'dataForm' | 'contactDetailsForm' | 'dealerForm';

export default function ModalWithStepper({ isOpen, onClose }: ModalWithStepperProps) {
  const [formData, setFormData] = useState({
    dataForm: { 
      firstName: '',
      lastName: '',
      typeDocument: '',
      numberDocument: '',
    },
    contactDetailsForm: { 
      phone: '',
      email: ''
    },
    dealerForm: { 
      name: '',
      city: ''
    },
  });

  const handleFormDataChange = (step: StepKey, data: Record<string, string>) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: { ...prevData[step], ...data },
    }));
  };

  const steps = [
    {
      title: 'Personal Info',
      content: <DataForm data={formData.dataForm} onChange={(data) => handleFormDataChange('dataForm', data)} />,
    },
    {
      title: 'Contact Details',
      content: <ContactDetailsForm data={formData.contactDetailsForm} onChange={(data) => handleFormDataChange('contactDetailsForm', data)} />,
    },
    {
      title: 'Dealership Info',
      content: <DealerForm data={formData.dealerForm} onChange={(data) => handleFormDataChange('dealerForm', data)} />,
    },
    {
      title: 'Confirmation',
      content: <ShippingConfirmation />,
    },
  ];

  const handleStepChange = (stepIndex: number) => {
  };

  const handleStepSendData = () => {
    console.log("Sen data", formData)
  };

  const handleStepRedirect = () => {
    console.log("Redirect")
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cotiza la Land Cruiser Prado First Edition">
      <Stepper 
        steps={steps} 
        onStepChange={handleStepChange} 
        onStepSendData={handleStepSendData}
        onStepRedirect={handleStepRedirect}
      />
    </Modal>
  );
}
