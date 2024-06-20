import patientsData from '../../data/patients';
import {
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatient,
  Patient
} from '../types';
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

const getIndividualPatient = (id: string): Patient | undefined => {
  return patientsData.find((patient) => patient.id === id);
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

const addEntry = (id: string, entry: EntryWithoutId): Patient => {
  const patient = patientsData.find((p) => p.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }

  const newEntry = {
    ...entry,
    id: uuid()
  };

  patient.entries.push(newEntry);
  return patient;
};

export default {
  getNonSensitivePatients,
  getIndividualPatient,
  addPatient,
  addEntry
};
