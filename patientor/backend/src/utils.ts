import {
  NewPatient,
  Gender,
  NewEntry,
  Entry,
  Discharge,
  NewHospitalEntry,
  NewHealthCheckEntry,
  HealthCheckRating,
  NewOccupationalHealthcareEntry,
  SickLeave,
} from './types';
import diagnoses from '../data/diagnoses';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  const rxDatePattern = /\d{4}-\d{2}-\d{2}/;
  return Boolean(Date.parse(date)) && rxDatePattern.test(date);
};

const isSsn = (ssn: string): boolean => {
  const regexp = /(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d+|\d\d-|[01]\dA)\d{3}[\dA-Z]/;
  return Boolean(regexp.test(ssn));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(Number(param));
};

function isEntry(entry: any): entry is Entry {
  if ((entry as Entry).type) {
    return true;
  }
  return false;
}
const hasOnlyStrings = (param: Array<any>): boolean => {
  let somethingIsNotString = false;
  param.forEach((p) => {
    if (isString(p)) {
      somethingIsNotString = true;
    }
  });
  if (!somethingIsNotString && param.length > 0) {
    return true;
  }
  return false;
};

const hasOnlyEntries = (param: Array<any>): boolean => {
  let somethingIsNotEntry = false;
  param.forEach((p) => {
    if (isEntry(p)) {
      somethingIsNotEntry = true;
    }
  });
  if (!somethingIsNotEntry && param.length > 0) {
    return true;
  }
  return false;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (
    rating === undefined ||
    isNaN(Number(rating)) ||
    !isHealthCheckRating(rating)
  ) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect or missing social security number: ' + ssn);
  }
  return ssn;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !Array.isArray(entries) || hasOnlyEntries(entries)) {
    throw new Error('Incorrect or missing entries: ' + entries);
  }
  return entries;
};

const parseDiagnosesCodes = (codes: any): string[] | undefined => {
  if (codes) {
    if (!Array.isArray(codes) || hasOnlyStrings(codes)) {
      throw new Error('Incorrect or missing diagnoses codes: ' + codes);
    }
  }
  return codes;
};

const parseTypeHospital = (entryType: any): 'Hospital' => {
  if (!entryType || !isString(entryType) || entryType !== 'Hospital') {
    throw new Error('Incorrect or missing type: ' + entryType);
  }
  return entryType;
};

const parseTypeHealthCheck = (entryType: any): 'HealthCheck' => {
  if (!entryType || !isString(entryType) || entryType !== 'HealthCheck') {
    throw new Error('Incorrect or missing type: ' + entryType);
  }
  return entryType;
};

const parseTypeOccupationalHealthcare = (
  entryType: any
): 'OccupationalHealthcare' => {
  if (
    !entryType ||
    !isString(entryType) ||
    entryType !== 'OccupationalHealthcare'
  ) {
    throw new Error('Incorrect or missing type: ' + entryType);
  }
  return entryType;
};

const parseDischarge = (discharge: any): Discharge => {
  const parsedDischarge = {
    date: parseDateOfBirth(discharge.date),
    criteria: parseName(discharge.criteria),
  };
  return parsedDischarge;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  const parsedSickLeave = {
    startDate: parseDateOfBirth(sickLeave.startDate),
    endDate: parseDateOfBirth(sickLeave.endDate),
  };
  return parsedSickLeave;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatient = (object: any): NewPatient => {
  const NewPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };

  return NewPatient;
};

export const toNewHospitalEntry = (object: any): NewHospitalEntry => {
  const HospitalEntry = {
    type: parseTypeHospital(object.type),
    description: parseName(object.description),
    date: parseDateOfBirth(object.date),
    specialist: parseName(object.specialist),
    diagnosisCodes: parseDiagnosesCodes(object.diagnosisCodes),
    discharge: parseDischarge(object.discharge),
  };
  return HospitalEntry;
};

export const toNewHealthCheckEntry = (object: any): NewHealthCheckEntry => {
  console.log('OBJECT', object);
  const HealthCheckEntry = {
    type: parseTypeHealthCheck(object.type),
    description: parseName(object.description),
    date: parseDateOfBirth(object.date),
    specialist: parseName(object.specialist),
    diagnosisCodes: parseDiagnosesCodes(object.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };
  return HealthCheckEntry;
};

export const toNewOccupationalHealthcareEntry = (
  object: any
): NewOccupationalHealthcareEntry => {
  const OccupationalHealthcareEntry = {
    type: parseTypeOccupationalHealthcare(object.type),
    description: parseName(object.description),
    date: parseDateOfBirth(object.date),
    specialist: parseName(object.specialist),
    diagnosisCodes: parseDiagnosesCodes(object.diagnosisCodes),
    employerName: parseName(object.employerName),
  };
  const hasSickLeave = object.sickLeave
    ? {
        ...OccupationalHealthcareEntry,
        sickLeave: parseSickLeave(object.sickLeave),
      }
    : undefined;
  return hasSickLeave !== undefined
    ? hasSickLeave
    : OccupationalHealthcareEntry;
};

export const toNewEntry = (object: any): NewEntry => {
  switch (object.type) {
    case 'Hospital':
      return toNewHospitalEntry(object);
    case 'HealthCheck':
      return toNewHealthCheckEntry(object);
    case 'OccupationalHealthcare':
      return toNewOccupationalHealthcareEntry(object);
    default:
      throw new Error('Incorrect or missing entry type: ' + object);
  }
};
