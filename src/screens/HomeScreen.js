import React, { useState, useEffect } from 'react';
import { getAllRecords, getLatestRecord } from '../services/StorageService';

const HomeScreen = ({ setActiveTab }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [engines, setEngines] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const allRecords = await getAllRecords();
      setRecords(allRecords);

      // Group by engine and get latest for each
      const enginesData = {};
      const uniqueEngines = [...new Set(allRecords.map(r => r.engineId))];

      for (const engineId of uniqueEngines) {
        const latest = await getLatestRecord(engineId);
        enginesData[engineId] = latest;
      }

      setEngines(enginesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysSinceChange = (date) => {
    const lastChange = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today - lastChange);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="screen" style={{ textAlign: 'center', paddingTop: 50 }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="screen-title">Oil Change Dashboard</div>
      <p style={{ color: '#666', marginBottom: 20 }}>
        {Object.keys(engines).length} Engine(s) Tracked
      </p>

      {Object.keys(engines).length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">⚠️</div>
          <p style={{ marginBottom: 5 }}>No records yet</p>
          <p style={{ fontSize: 14, marginBottom: 20 }}>Start by recording an oil change</p>
          <button
            className="btn btn-primary"
            onClick={() => setActiveTab('Record')}
            style={{ width: 200 }}
          >
            ➕ Record Now
          </button>
        </div>
      ) : (
        <div>
          {Object.entries(engines).map(([engineId, record]) => (
            <div key={engineId} className="card">
              <div className="card-title">{record.engineName}</div>
              <div className="card-content" style={{ marginBottom: 10 }}>
                <p style={{ marginBottom: 5 }}>
                  <strong>Oil Type:</strong> {record.oilType}
                </p>
                <p style={{ marginBottom: 5 }}>
                  <strong>Hours:</strong> {record.hours}
                </p>
                <p>
                  <strong>Last Changed:</strong> {calculateDaysSinceChange(record.date)} days ago
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
