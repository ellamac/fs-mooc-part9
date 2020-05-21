import { NewPatient, Gender } from './types';

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

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect or missing social security number: ' + ssn);
  }
  return ssn;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatient = (object: any): NewPatient => {
  const NewPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };

  return NewPatient;
};

export default toNewPatient;
