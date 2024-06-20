import { useEffect, useState } from 'react';
import { Diagnosis, Entry } from '../../types';
import diagnosesService from '../../services/diagnoses';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthCare';
import Hospital from './Hospital';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = (props: EntryDetailsProps) => {
  const { entry } = props;
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const result = await diagnosesService.getAllDiagnoses();
      setDiagnoses(result);
    };
    fetchDiagnoses();
  }, []);

  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : 'Unknown diagnosis';
  };

  switch (entry.type) {
    case 'Hospital':
      return (
        <Hospital getDiagnosisName={getDiagnosisName} hospitalEntry={entry} />
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcare
          getDiagnosisName={getDiagnosisName}
          occupationHealthcareEntry={entry}
        />
      );
    case 'HealthCheck':
      return (
        <HealthCheck
          getDiagnosisName={getDiagnosisName}
          healthCheckEntry={entry}
        />
      );
  }
};

export default EntryDetails;
