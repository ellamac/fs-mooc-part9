import patientsData from '../../data/patients';
import { uuidv4 } from '../RandomUUID';
import {
  NonSensitivePatient,
  Patient,
  NewPatient,
  NewEntry,
  PublicPatient,
  Entry,
} from '../types';

let patients: Array<Patient> = patientsData as Array<Patient>;

const getPatient = (patientId: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === patientId);
  return patient;
};

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const newEntry = {
    ...entry,
    id: uuidv4(),
  };
  let patient = patients.find((p) => p.id === id);
  if (patient?.entries !== undefined) {
    patient?.entries.push(newEntry);
    patients.map((p) => (p.id !== id ? p : patient));
    return newEntry;
  }
  patients.map((p) => (p.id !== id ? p : { ...patient, entries: [newEntry] }));
  return newEntry;
};

export default {
  getPatient,
  getPatients,
  getNonSensitivePatients,
  addPatient,
  addEntry,
};
