import { OccupationalHealthcareEntry } from '../../types';
import { Work } from '@mui/icons-material';

interface OccupationalHealthcareProps {
  occupationHealthcareEntry: OccupationalHealthcareEntry;
  getDiagnosisName: (code: string) => string;
}

const OccupationalHealthcare = (props: OccupationalHealthcareProps) => {
  const { occupationHealthcareEntry, getDiagnosisName } = props;

  return (
    <div
      style={{
        border: '1px solid black',
        margin: '10px'
      }}
    >
      <p>
        {occupationHealthcareEntry.date} <Work />{' '}
        {occupationHealthcareEntry.employerName}
      </p>
      <i>{occupationHealthcareEntry.description}</i>
      <p>diagnosed by {occupationHealthcareEntry.specialist} </p>
      <ul>
        {occupationHealthcareEntry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {getDiagnosisName(code)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OccupationalHealthcare;
