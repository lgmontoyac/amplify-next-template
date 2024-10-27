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
}

export default function Stepper({ steps, onStepChange }: StepperProps) {
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
                    <div
                      style={{
                        fontSize: "15px",
                        color: "#F6F6F6",
                        marginTop: "4px",
                      }}
                    >
                      {step.title}
                    </div>
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
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            style={{ border: "none", background: "transparent" }}
          >
            <Image
              textAlign="center"
              src="/assets/icons/icon_arrow.svg"
              alt="Icon Arrow"
              loading="lazy"
              style={{ width: "1rem" }}
            />
          </Button>
          <Button
            variation="primary"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
