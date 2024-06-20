import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EntryWithoutId, Gender, Patient } from '../../types';
import patientsService from '../../services/patients';
import { Female, Male } from '@mui/icons-material';
import EntryDetails from './EntryDetails';
import NewEntryForm from './NewEntryForm';

const IndividualPatient = () => {
  const { id } = useParams();
  const [patientDetail, setPatientDetail] = useState<Patient | undefined>(
    undefined
  );

  useEffect(() => {
    if (id) {
      const fetchIndivPatient = async () => {
        const result = await patientsService.getIndividualPatient(id);
        setPatientDetail(result);
      };
      fetchIndivPatient();
    }
  }, [id]);

  const handleNewEntry = async (entry: EntryWithoutId) => {
    if (!id) return;
    try {
      const updatedPatient = await patientsService.addEntry(id, entry);
      setPatientDetail(updatedPatient);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>
        {patientDetail?.name}{' '}
        {patientDetail?.gender === Gender.Female ? <Female /> : <Male />}
      </h3>
      <p>ssh: {patientDetail?.ssn}</p>
      <p>occupation: {patientDetail?.occupation}</p>
      {patientDetail?.entries[0] && (
        <>
          <h4>entries</h4>
          {patientDetail.entries.map((entry) => (
            <EntryDetails entry={entry} key={entry.id} />
          ))}
        </>
      )}
      <NewEntryForm onSubmit={handleNewEntry} />
    </div>
  );
};

export default IndividualPatient;
