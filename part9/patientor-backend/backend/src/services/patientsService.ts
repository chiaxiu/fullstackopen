import patientsData from '../../data/patients';
import { NewPatientEntry, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const id = uuid();

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id,
    ...entry
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitivePatients,
  addPatient
};
