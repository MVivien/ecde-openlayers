import PropTypes from 'prop-types';
//import { useState } from 'react';
import {
  ToggleButtonGroup,
  Select,
  MenuItem,
  ToggleButton,
  Tooltip,
  SvgIcon,
  Chip,
} from '@mui/material';

InputPanel.propTypes = {
  rcp: PropTypes.string,
  setRcp: PropTypes.func,
  horizon: PropTypes.string,
  setHorizon: PropTypes.func,
  region: PropTypes.string,
  setRegion: PropTypes.func,
  regionalAggregation: PropTypes.string,
  setRegionalAggregation: PropTypes.func,
  temporalAggregation: PropTypes.string,
  setTemporalAggregation: PropTypes.func,
  month: PropTypes.number,
  setMonth: PropTypes.func,
  season: PropTypes.number,
  setSeason: PropTypes.func,
  mapType: PropTypes.string,
  setMapType: PropTypes.func,
};

function InputPanel({
  rcp,
  setRcp,
  horizon,
  setHorizon,
  //region,
  //setRegion,
  regionalAggregation,
  setRegionalAggregation,
  temporalAggregation,
  setTemporalAggregation,
  month,
  setMonth,
  season,
  setSeason,
  mapType,
  setMapType,
}) {
  const months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ];
  const seasons = [
    { id: 1, label: 'Winter (DJF)', value: 12 },
    { id: 2, label: 'Spring (MAM)', value: 3 },
    { id: 3, label: 'Summer (JJA)', value: 6 },
    { id: 4, label: 'Autumn (SON)', value: 9 },
  ];

  const mapTypes = [
    { id: 1, label: 'Actual values', value: 'actual' },
    { id: 2, label: 'Change from 1981 - 2010', value: 'change' },
  ];

  const handleRcpChange = (event) => {
    setRcp(event.target.value);
  };

  const handleHorizonChange = (event) => {
    setHorizon(event.target.value);
  };

  const handleRegionalAggregation = (event) => {
    setRegionalAggregation(event.target.value);
  };

  const handleTemporalAggregation = (event) => {
    setTemporalAggregation(event.target.value);
    setMonth(7);
    setSeason(6);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleMapTypeChange = (event) => {
    setMapType(event.target.value);
    if (event.target.value == 'change' && horizon == '1981-01-01') {
      setHorizon('2011-01-01');
    }
  };

  return (
    <>
      <h4 style={{ fontWeight: 300 }}>
        Powered By
        <a
          href="/"
          style={{
            textDecoration: 'none',
            fontWeight: 500,
            color: 'dodgerblue',
            paddingLeft: '10px',
          }}
        >
          Copernicus Climate Data Store
        </a>
      </h4>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Chip label="Regions" variant="label" component="label" />
        <Tooltip title="Info about regions">
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#686666"
              style={{ width: '1.2rem', marginLeft: '1rem' }}
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </SvgIcon>
        </Tooltip>
      </div>
      <ToggleButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        value={regionalAggregation}
        onChange={handleRegionalAggregation}
      >
        <ToggleButton value="nuts">NUTS</ToggleButton>
        <ToggleButton value="transnational">Transnational regions</ToggleButton>
        <ToggleButton value="europe">Europe Zones</ToggleButton>
      </ToggleButtonGroup>
      <hr style={{ border: '0.5px solid lightgrey' }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Chip label="Time span" variant="label" component="label" />
        <Tooltip title="Info about time span">
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#686666"
              style={{ width: '1.2rem', marginLeft: '1rem' }}
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </SvgIcon>
        </Tooltip>
      </div>
      <ToggleButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        value={temporalAggregation}
        onChange={handleTemporalAggregation}
      >
        <ToggleButton value="yearly">Year</ToggleButton>
        <ToggleButton value="seasonal">Season</ToggleButton>
        <ToggleButton value="monthly">Month</ToggleButton>
      </ToggleButtonGroup>
      <hr style={{ border: '0.5px solid lightgrey' }} />
      {temporalAggregation === 'monthly' ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Chip label="Month" variant="label" component="label" />
            <Tooltip title="Info about months">
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#686666"
                  style={{ width: '1.2rem', marginLeft: '1rem' }}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </SvgIcon>
            </Tooltip>
          </div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            onChange={handleMonthChange}
            sx={{
              width: '10rem',
            }}
          >
            {months.map((m) => {
              return (
                <MenuItem value={m.value} key={m.value}>
                  {m.label}
                </MenuItem>
              );
            })}
          </Select>
          <hr style={{ border: '0.5px solid lightgrey' }} />
        </>
      ) : null}
      {temporalAggregation === 'seasonal' ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Chip label="Season" variant="label" component="label" />
            <Tooltip title="Info about season">
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#686666"
                  style={{ width: '1.2rem', marginLeft: '1rem' }}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </SvgIcon>
            </Tooltip>
          </div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={season}
            onChange={handleSeasonChange}
            sx={{
              width: '10rem',
            }}
          >
            {seasons.map((m) => {
              return (
                <MenuItem value={m.value} key={m.id}>
                  {m.label}
                </MenuItem>
              );
            })}
          </Select>
          <hr style={{ border: '0.5px solid lightgrey' }} />
        </>
      ) : null}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Chip label="Scenario" variant="label" component="label" />
        <Tooltip title="Info about scenario">
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#686666"
              style={{ width: '1.2rem', marginLeft: '1rem' }}
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </SvgIcon>
        </Tooltip>
      </div>
      <ToggleButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        id="control-1"
        value={rcp}
        label="RCP scenario"
        onChange={handleRcpChange}
      >
        <ToggleButton value="rcp_4_5">RCP4.5</ToggleButton>
        <ToggleButton value="rcp_8_5">RCP8.5</ToggleButton>
      </ToggleButtonGroup>
      <hr style={{ border: '0.5px solid lightgrey' }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Chip label="Time Horizon" variant="label" component="label" />
        <Tooltip title="Info about regions">
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#686666"
              style={{ width: '1.2rem', marginLeft: '1rem' }}
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </SvgIcon>
        </Tooltip>
      </div>
      <ToggleButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        id="time-hprizon"
        value={horizon}
        label="Time Horizon"
        onChange={handleHorizonChange}
      >
        <ToggleButton value="1981-01-01" disabled={mapType === 'change'}>
          1981-2010
        </ToggleButton>
        <ToggleButton value="2011-01-01">2011-2040</ToggleButton>
        <ToggleButton value="2041-01-01">2041-2070</ToggleButton>
        <ToggleButton value="2071-01-01">2071-2100</ToggleButton>
      </ToggleButtonGroup>
      <hr style={{ border: '0.5px solid lightgrey' }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Chip label="Map Type" variant="label" component="label" />
        <Tooltip title="Info about map type">
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#686666"
              style={{ width: '1.2rem', marginLeft: '1rem' }}
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </SvgIcon>
        </Tooltip>
      </div>
      <ToggleButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        id="map-type"
        value={mapType}
        label="Map Type"
        onChange={handleMapTypeChange}
      >
        {mapTypes.map((m) => {
          return (
            <ToggleButton value={m.value} key={m.value}>
              {m.label}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </>
  );
}

export default InputPanel;
