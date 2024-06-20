import { HospitalEntry } from '../../types';
import { LocalHospital } from '@mui/icons-material';

interface HospitalProps {
  hospitalEntry: HospitalEntry;
  getDiagnosisName: (code: string) => string;
}

const Hospital = (props: HospitalProps) => {
  const { hospitalEntry, getDiagnosisName } = props;

  return (
    <div
      style={{
        border: '1px solid black',
        margin: '10px'
      }}
    >
      <p>
        {hospitalEntry.date} <LocalHospital />
      </p>
      <i>{hospitalEntry.description}</i>
      <p>diagnosed by {hospitalEntry.specialist} </p>
      <ul>
        {hospitalEntry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {getDiagnosisName(code)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hospital;
