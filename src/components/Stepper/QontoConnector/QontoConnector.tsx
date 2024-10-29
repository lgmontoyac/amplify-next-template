import { StepConnector, StepIcon } from '@mui/material';
import { styled } from '@mui/material/styles';


export const QontoConnector = styled(StepConnector)(({ theme }) => ({
  height: 2,
  marginRight: '30px',
  marginLeft: '35px',
  marginTop: '1rem',
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
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: active ? '#D42224' : completed ? '#D42224' : '#ffffff',
        color: active ? '#F6F6F6' : completed ? '#F6F6F6' : '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {completed ? '✓' : props.icon}
    </div>
  );
};

export const StepContainer = styled('div')({
  margin: '10px 60px', 
});