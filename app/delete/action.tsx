'use client'
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';

export default function HealthForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [healthData, setHealthData] = useState<any[]>([]); // Array to hold health records
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]); // Array of IDs for selected records
  const [loading, setLoading] = useState(true);

  const getHealthData = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('health')
        .select('*'); // Select all columns

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setHealthData(data);
      }
    } catch (error) {
      alert('Error loading health data!');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);

      const { error } = await supabase.from('health').delete().eq('id', id); // Delete by ID
      if (error) throw error;

      const filteredData = healthData.filter(record => record.id !== id); // Filter out deleted record
      setHealthData(filteredData);
      setSelectedRecords(selectedRecords.filter(recordId => recordId !== id)); // Remove deleted record from selection
      alert('Record deleted successfully!');
    } catch (error) {
      alert('Error deleting record!');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedRecords([...selectedRecords, value]); // Add selected ID
    } else {
      setSelectedRecords(selectedRecords.filter(id => id !== value)); // Remove deselected ID
    }
  };

  useEffect(() => {
    getHealthData();
  }, [user, getHealthData]);

  return (
    <div className="form-widget">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Health Records</h2>
          <button
            className="button primary"
            disabled={!selectedRecords.length || loading} // Disable delete if no records selected or loading
            onClick={() => {
              if (window.confirm('Are you sure you want to delete selected records?')) {
                selectedRecords.forEach(handleDelete); // Delete each selected record
              }
            }}
          >
            Delete Selected
          </button>
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Title</th>
                <th>Description</th>
                {/* Add other headers as needed */}
              </tr>
            </thead>
            <tbody>
              {healthData.map(record => (
                <tr key={record.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(record.id)} // Check if record is selected
                      onChange={handleSelectChange}
                      value={record.id} // Set checkbox value to record ID
                    />
                  </td>
                  <td>{record.title}</td>
                  <td>{record.description}</td>
                  {/* Add other table cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ... rest of your form code */}
    </div>
  );
}