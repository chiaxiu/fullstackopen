// components/NewEntryForm.tsx
import React, { useState } from 'react';
import {
  EntryWithoutId,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  healthCheckRating
} from '../../types';

const NewEntryForm = ({
  onSubmit
}: {
  onSubmit: (entry: EntryWithoutId) => void;
}) => {
  const [type, setType] = useState<string>('HealthCheck');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const commonFields = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(',')
    };
    let newEntry: EntryWithoutId;

    switch (type) {
      case 'HealthCheck':
        newEntry = {
          ...commonFields,
          type: 'HealthCheck',
          healthCheckRating: healthCheckRating as healthCheckRating
        } as HealthCheckEntry;
        break;
      case 'OccupationalHealthcare':
        newEntry = {
          ...commonFields,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave:
            sickLeaveStartDate && sickLeaveEndDate
              ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
              : undefined
        } as OccupationalHealthcareEntry;
        break;
      case 'Hospital':
        newEntry = {
          ...commonFields,
          type: 'Hospital',
          discharge: { date: dischargeDate, criteria: dischargeCriteria }
        } as HospitalEntry;
        break;
      default:
        return;
    }

    onSubmit(newEntry);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={handleTypeChange}>
        <option value='HealthCheck'>Health Check</option>
        <option value='OccupationalHealthcare'>Occupational Healthcare</option>
        <option value='Hospital'>Hospital</option>
      </select>
      <input
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type='date'
        placeholder='Date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        placeholder='Specialist'
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
      />
      <input
        placeholder='Diagnosis Codes (comma separated)'
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value)}
      />

      {type === 'HealthCheck' && (
        <input
          type='number'
          placeholder='Health Check Rating'
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(Number(e.target.value))}
        />
      )}
      {type === 'OccupationalHealthcare' && (
        <>
          <input
            placeholder='Employer Name'
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
          <input
            type='date'
            placeholder='Sick Leave Start Date'
            value={sickLeaveStartDate}
            onChange={(e) => setSickLeaveStartDate(e.target.value)}
          />
          <input
            type='date'
            placeholder='Sick Leave End Date'
            value={sickLeaveEndDate}
            onChange={(e) => setSickLeaveEndDate(e.target.value)}
          />
        </>
      )}
      {type === 'Hospital' && (
        <>
          <input
            type='date'
            placeholder='Discharge Date'
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
          <input
            placeholder='Discharge Criteria'
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
          />
        </>
      )}
      <button type='submit'>Add Entry</button>
    </form>
  );
};

export default NewEntryForm;
