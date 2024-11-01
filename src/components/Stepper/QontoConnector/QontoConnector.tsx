import { Image } from "@aws-amplify/ui-react";
import { StepConnector, StepIcon } from '@mui/material';
import { styled } from '@mui/material/styles';

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
  height: '0.125rem',
  marginRight: '6rem',
  marginLeft: '6rem',
  marginTop: '3rem',
  backgroundColor: '#E0E0E0',
  '&.Mui-active': {
    backgroundColor: '#D42224', 
  },
  '&.Mui-completed': {
    backgroundColor: '#D42224', 
  },
}));

export const QontoStepIcon = (props: any) => {
  const { active, completed, icon } = props;

  return (
    <div
      style={{
        width: "9.313rem",
        height: "9.313rem",
        borderRadius: '50%',
        backgroundColor: active ? '#D42224' : completed ? '#D42224' : '#ffffff',
        color: active ? '#F6F6F6' : completed ? '#F6F6F6' : '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: "4rem",
        fontWeight: 400,
        lineHeight: "4.375rem",
        letterSpacing: "-0.02em",
        textAlign: "center",
      }}
    >
    {completed ?  
      <Image 
        src='/assets/icons/icon_check.svg' 
        alt="Icono de confirmación" 
      />
      : props.icon
    }
    </div>
  );
};

export const StepContainer = styled('div')({
  margin: '0.625rem 3.75rem', 
});
