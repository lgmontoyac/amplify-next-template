import { TextField } from '@aws-amplify/ui-react';
import Modal from './../Modal/Modal';
import Stepper from './../Stepper/Stepper';

interface ModalWithStepperProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalWithStepper({ isOpen, onClose }: ModalWithStepperProps) {

  const steps = [
    {
      title: 'Datos',
      content: <TextField label="Campo del Paso 1"  />,
    },
    {
      title: 'Datos de contacto',
      content: <TextField label="Campo del Paso 2"  />,
    },
    {
      title: 'Concesionario',
      content: <TextField label="Campo del Paso 3"  />,
    },
    {
      title: 'Confirmación',
      content: <TextField label="Campo del Paso 3"  />,
    },
  ];
  

  const handleStepChange = (stepIndex: number) => {
    console.log(`naviagate ${stepIndex + 1}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cotiza la Land Cruiser Prado First Edition">
      <Stepper steps={steps} onStepChange={handleStepChange} />
    </Modal>
  );
}
