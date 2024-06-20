import { HealthCheckEntry, healthCheckRating } from '../../types';
import { MedicalInformation, Favorite } from '@mui/icons-material';

interface HealthCheckProps {
  healthCheckEntry: HealthCheckEntry;
  getDiagnosisName: (code: string) => string;
}

const HealthCheck = (props: HealthCheckProps) => {
  const { healthCheckEntry, getDiagnosisName } = props;

  const getIconColor = (rating: healthCheckRating): string => {
    switch (rating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return 'white';
    }
  };

  return (
    <div
      style={{
        border: '1px solid black',
        margin: '10px'
      }}
    >
      <p>
        {healthCheckEntry.date} <MedicalInformation />
      </p>
      <i>{healthCheckEntry.description}</i>
      <p>
        {healthCheckEntry.healthCheckRating}
        <Favorite
          sx={{ color: `${getIconColor(healthCheckEntry.healthCheckRating)}` }}
        />
      </p>
      <p>diagnosed by {healthCheckEntry.specialist} </p>
      <ul>
        {healthCheckEntry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {getDiagnosisName(code)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthCheck;
