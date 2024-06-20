import {
  Diagnosis,
  Discharge,
  EntryWithoutId,
  Gender,
  HealthCheckEntry,
  HospitalEntry,
  NewPatientEntry,
  OccupationalHealthcareEntry,
  healthCheckRating
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }

  return employerName;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };

    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const toNewHealthCheckEntry = (
  object: unknown
): Omit<HealthCheckEntry, 'id'> => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'diagnosisCodes' in object &&
    'healthCheckRating' in object
  ) {
    const newEntry: EntryWithoutId = {
      type: 'HealthCheck',
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      healthCheckRating: object.healthCheckRating as healthCheckRating
    };

    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

const toNewOccupationalHealthcareEntry = (
  object: unknown
): Omit<OccupationalHealthcareEntry, 'id'> => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'diagnosisCodes' in object &&
    'employerName' in object
  ) {
    const newEntry: EntryWithoutId = {
      type: 'OccupationalHealthcare',
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      employerName: parseEmployerName(object.employerName)
    };

    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

const toNewHospitalEntry = (object: unknown): Omit<HospitalEntry, 'id'> => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'diagnosisCodes' in object &&
    'discharge' in object
  ) {
    const newEntry: EntryWithoutId = {
      type: 'Hospital',
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      discharge: object.discharge as Discharge
    };

    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in object) {
    switch (object.type) {
      case 'HealthCheck':
        return toNewHealthCheckEntry(object);
      case 'OccupationalHealthcare':
        return toNewOccupationalHealthcareEntry(object);
      case 'Hospital':
        return toNewHospitalEntry(object);
      default:
        throw new Error('Invalid or missing entry type');
    }
  }

  throw new Error('Incorrect data: a field missing');
};

export default { toNewPatientEntry, toNewEntry };
