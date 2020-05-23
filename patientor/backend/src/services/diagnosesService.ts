import diagnosesData from '../../data/diagnoses';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosesData as Array<Diagnose>;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};
const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose,
};
