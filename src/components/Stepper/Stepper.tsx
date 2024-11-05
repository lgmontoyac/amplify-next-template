import { useState } from "react";
import { Stepper as MUIStepper, Step, StepLabel } from "@mui/material";
import styles from "./Stepper.module.scss";
import {
  QontoConnector,
  QontoStepIcon,
  StepContainer,
} from "./QontoConnector/QontoConnector";
import { Button, Image } from "@aws-amplify/ui-react";

interface Step {
  title: string;
  content: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  onStepChange: (stepIndex: number) => void;
  onStepSendData: () => void;
  onStepRedirect: () => void;
  isStepValid: boolean[];
}

export default function Stepper({
  steps,
  onStepChange,
  onStepSendData,
  onStepRedirect,
  isStepValid,
}: StepperProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
    onStepChange(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    onStepChange(activeStep - 1);
  };

  return (
    <div className={styles.stepperContainer}>
      <MUIStepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={(props) => (
                <QontoStepIcon {...props} icon={index + 1} />
              )}
            >
              <StepContainer>
                <div style={{ textAlign: "center" }}>
                  {step.title && (
                    <div className={styles.title}>{step.title}</div>
                  )}
                </div>
              </StepContainer>
            </StepLabel>
          </Step>
        ))}
      </MUIStepper>
      <div className={styles.stepContent}>
        {steps[activeStep].content}
        <div className={styles.buttonContainer}>
          {activeStep !== steps.length - 1 && (
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              marginTop="5rem"
              marginBottom="5rem"
              border="none"
              backgroundColor="transparent"
              marginLeft="3rem"
            >
              {activeStep != 0 && (
                <Image
                  textAlign="center"
                  src="/assets/icons/icon_arrow.svg"
                  alt="Icon Arrow"
                  loading="lazy"
                  className={styles.arrowImage}
                />
              )}
            </Button>
          )}
          <Button
            variation="primary"
            display="inline-flex"
            size="large"
            padding="1.563rem 4.313rem"
            fontSize="xl"
            marginTop="5rem"
            marginBottom="5rem"
            marginRight="3rem"
            disabled={!isStepValid[activeStep]}
            onClick={() => {
              if (activeStep === steps.length - 2) {
                onStepSendData();
                handleNext();
              } else if (activeStep === steps.length - 1) {
                onStepRedirect();
              } else {
                handleNext();
              }
            }}
          >
            {activeStep === steps.length - 2
              ? "Enviar"
              : activeStep === steps.length - 1
              ? "Ver más vehículos"
              : "Siguiente"}
          </Button>
        </div>
      </div>
    </div>
  );
}
