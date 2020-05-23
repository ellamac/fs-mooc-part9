import React, { useEffect } from 'react';
import axios from 'axios';
import { Segment, Icon } from 'semantic-ui-react';
import { Entry, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setDiagnosisList } from '../state';

type EntryProps = {
  entry: Entry;
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }: EntryProps) => {
  const [{ diagnoses }, dispatch] = useStateValue();

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

  if (entry === undefined || Object.keys(diagnoses).length === 0) {
    return <div>Loading...</div>;
  }

  const mapEntries = () => {
    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };

    if (entry !== undefined && diagnoses !== undefined) {
      switch (entry.type) {
        case 'HealthCheck':
          return (
            <div>
              <div>
                <h4>
                  {entry.date} <Icon name='doctor' size='large' />
                </h4>
              </div>
              <i>{entry.description}</i>
              {entry.diagnosisCodes !== undefined ? (
                <Segment>
                  <h4>Diagnoses:</h4>
                  <ul>
                    {entry.diagnosisCodes.map((d) => (
                      <li key={d}>
                        {d} {diagnoses[d] !== undefined ? diagnoses[d].name : d}
                      </li>
                    ))}
                  </ul>
                </Segment>
              ) : (
                <div />
              )}
              <Icon
                name='heart'
                color={
                  entry.healthCheckRating === 3
                    ? 'red'
                    : entry.healthCheckRating === 2
                    ? 'orange'
                    : entry.healthCheckRating === 1
                    ? 'yellow'
                    : 'green'
                }
              />
            </div>
          );
        case 'Hospital':
          return (
            <div>
              <div>
                <h4>
                  {entry.date}
                  <Icon name='hospital' size='large' />
                  {entry.discharge ? (
                    <i>
                      discharged on {entry.discharge.date}:{' '}
                      {entry.discharge.criteria}
                    </i>
                  ) : (
                    <></>
                  )}
                </h4>
              </div>
              <i>{entry.description}</i>
              {entry.diagnosisCodes !== undefined ? (
                <Segment>
                  <h4>Diagnoses:</h4>
                  <ul>
                    {entry.diagnosisCodes.map((d) => (
                      <li key={d}>
                        {d} {diagnoses[d] !== undefined ? diagnoses[d].name : d}
                      </li>
                    ))}
                  </ul>
                </Segment>
              ) : (
                <div />
              )}
            </div>
          );
        case 'OccupationalHealthcare':
          return (
            <div>
              <div>
                <h4>
                  {entry.date} <Icon name='stethoscope' size='large' />{' '}
                  {entry.employerName}
                </h4>
              </div>
              <i>{entry.description}</i>
              {entry.sickLeave ? (
                <div>
                  <strong>
                    On leave from: {entry.sickLeave.startDate} to:{' '}
                    {entry.sickLeave.endDate}
                  </strong>
                </div>
              ) : (
                <div />
              )}
              {entry.diagnosisCodes !== undefined ? (
                <Segment>
                  <h4>Diagnoses:</h4>
                  <ul>
                    {entry.diagnosisCodes.map((d) => (
                      <li key={d}>
                        {d} {diagnoses[d] !== undefined ? diagnoses[d].name : d}
                      </li>
                    ))}
                  </ul>
                </Segment>
              ) : (
                <div />
              )}
            </div>
          );
        default:
          assertNever(entry);
      }
    }
  };

  return <Segment>{mapEntries()}</Segment>;
};

export default EntryDetails;
