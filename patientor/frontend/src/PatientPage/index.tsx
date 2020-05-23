import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Icon, Divider, Button, Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import AddHealthCheckEntryModal from '../AddHealthCheckEntryModal';

import {
  Patient,
  Diagnosis,
  NewHealthCheckEntry,
  Entry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
} from '../types';
import { apiBaseUrl } from '../constants';

import {
  useStateValue,
  setPatient,
  setDiagnosisList,
  addEntry,
} from '../state';
import EntryDetails from './EntryDetails';
import AddHospitalEntryModal from '../AddHospitalEntryModal';
import AddOccupationalHealthcareEntryModal from '../AddOccupationalHealthcareEntryModal';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();
  const [healthCheckModalOpen, setHealthCheckModalOpen] = React.useState<
    boolean
  >(false);
  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(
    false
  );
  const [
    occupationalHealthcareModalOpen,
    setOccupationalHealthcareModalOpen,
  ] = React.useState<boolean>(false);
  const fetchDiagnosisList = async () => {
    try {
      const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
      );
      dispatch(setDiagnosisList(diagnosisListFromApi));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (diagnoses === undefined || Object.keys(diagnoses).length === 0)
      fetchDiagnosisList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getPatient = async () => {
    try {
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(setPatient(patient));
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  useEffect(() => {
    if (patient === undefined || patient.id !== id) {
      getPatient();
    }
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  if (patient === undefined) {
    return <div>Loading...</div>;
  }

  const openHealthCheckModal = (): void => setHealthCheckModalOpen(true);
  const openHospitalModal = (): void => setHospitalModalOpen(true);
  const openOccupationalHealthcareModal = (): void =>
    setOccupationalHealthcareModalOpen(true);

  const closeHealthCheckModal = (): void => {
    setHealthCheckModalOpen(false);
    setError(undefined);
  };

  const closeHospitalModal = (): void => {
    setHospitalModalOpen(false);
    setError(undefined);
  };

  const closeOccupationalHealthcareModal = (): void => {
    setOccupationalHealthcareModalOpen(false);
    setError(undefined);
  };

  const submitNewHealthCheckEntry = async (values: NewHealthCheckEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      getPatient();
      closeHealthCheckModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  };

  const submitNewHospitalEntry = async (values: NewHospitalEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      getPatient();
      closeHospitalModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  };

  const submitOccupationalHealthcareEntry = async (
    values: NewOccupationalHealthcareEntry
  ) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      getPatient();
      closeOccupationalHealthcareModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  };

  return (
    <div className='App'>
      <Container>
        <h3>
          {patient.name}{' '}
          <Icon
            name={
              patient.gender === 'male'
                ? 'mars'
                : patient.gender === 'female'
                ? 'venus'
                : 'genderless'
            }
          />
        </h3>
      </Container>
      <Divider hidden />
      <Container>
        <div>ssn: {patient.ssn}</div>
        <div>date of birth: {patient.dateOfBirth}</div>
        <div>gender: {patient.gender}</div>
        <div>occupation: {patient.occupation}</div>
      </Container>
      <Divider hidden />
      <Container>
        <h3>Entries</h3>
        {patient.entries !== undefined && patient.entries.length > 0 ? (
          patient.entries.map((e) => <EntryDetails key={e.id} entry={e} />)
        ) : (
          <></>
        )}
      </Container>
      <Divider hidden />
      <Container>
        <AddHealthCheckEntryModal
          modalOpen={healthCheckModalOpen}
          onSubmit={submitNewHealthCheckEntry}
          error={error}
          onClose={closeHealthCheckModal}
        />
        <AddHospitalEntryModal
          modalOpen={hospitalModalOpen}
          onSubmit={submitNewHospitalEntry}
          error={error}
          onClose={closeHospitalModal}
        />
        <AddOccupationalHealthcareEntryModal
          modalOpen={occupationalHealthcareModalOpen}
          onSubmit={submitOccupationalHealthcareEntry}
          error={error}
          onClose={closeOccupationalHealthcareModal}
        />
        <Grid>
          <Grid.Column floated='left' width={5}>
            <Button onClick={() => openHealthCheckModal()}>
              Add New Health Check Entry
            </Button>
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <Button onClick={() => openOccupationalHealthcareModal()}>
              Add New Occupational Healthcare Entry
            </Button>
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <Button onClick={() => openHospitalModal()}>
              Add New Hospital Entry
            </Button>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default PatientPage;
