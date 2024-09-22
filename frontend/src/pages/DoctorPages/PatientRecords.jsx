import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPatientRecords,
  updatePatientInfo,
  updateHealthcareRecord,
  deleteHealthcareRecord,
} from "../../store/appointmentsSlice";
import { PlusCircle, Edit2, Save, X, Trash2 } from "lucide-react";

const PatientRecords = () => {
  const dispatch = useDispatch();
  const { patientRecords, loadingRecords, errorRecords } = useSelector(
    (state) => state.appointments
  );
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [newRecord, setNewRecord] = useState(null);

  useEffect(() => {
    dispatch(fetchPatientRecords());
  }, [dispatch]);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient.id === selectedPatient?.id ? null : patient);
    setEditingPatient(null);
    setEditingRecord(null);
    setNewRecord(null);
  };

  const handlePatientEdit = (e, patient) => {
    e.stopPropagation();
    setEditingPatient(patient);
  };

  const handlePatientSave = (e) => {
    e.stopPropagation();
    dispatch(
      updatePatientInfo({
        patientId: editingPatient.id,
        updates: editingPatient,
      })
    );
    setEditingPatient(null);
  };

  const handlePatientInputChange = (e) => {
    e.stopPropagation();
    setEditingPatient({ ...editingPatient, [e.target.name]: e.target.value });
  };

  const handleRecordEdit = (record) => {
    setEditingRecord(record);
    setNewRecord(null);
  };

  const handleRecordSave = () => {
    if (newRecord) {
      // Handle adding new record
      dispatch(addHealthcareRecord(newRecord));
    } else {
      dispatch(
        updateHealthcareRecord({
          recordId: editingRecord.record_id,
          updates: editingRecord,
        })
      );
    }
    setEditingRecord(null);
    setNewRecord(null);
  };

  const handleRecordDelete = (recordId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      dispatch(deleteHealthcareRecord(recordId));
    }
  };

  const handleRecordInputChange = (e) => {
    if (newRecord) {
      setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
    } else {
      setEditingRecord({ ...editingRecord, [e.target.name]: e.target.value });
    }
  };

  if (loadingRecords)
    return <div className="text-center py-10">Loading...</div>;
  if (errorRecords)
    return <div className="text-center text-red-500 py-10">{errorRecords}</div>;

  const uniquePatients = Array.from(
    new Set(patientRecords.map((p) => p.id))
  ).map((id) => {
    return patientRecords.find((p) => p.id === id);
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Patient Records</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b">
            Patients
          </h2>
          <div className="overflow-y-auto h-[calc(100vh-200px)]">
            {uniquePatients.map((patient) => (
              <div
                key={patient.id}
                className={`p-4 border-b cursor-pointer transition-colors duration-150 ${
                  selectedPatient?.id === patient.id
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handlePatientClick(patient)}
              >
                <h3 className="font-bold text-lg">
                  {patient.username || "Unknown Name"}
                </h3>
                <p className="text-sm text-gray-600">
                  Email: {patient.email || "Not Available"}
                </p>
                <p className="text-sm text-gray-600">
                  Gender: {patient.gender || "Not Specified"}
                </p>
                <p className="text-sm text-gray-600">
                  Date of Birth:{" "}
                  {patient.dob
                    ? new Date(patient.dob).toLocaleDateString()
                    : "Not Available"}
                </p>
                {editingPatient?.id === patient.id ? (
                  <div className="mt-2 space-y-2">
                    <input
                      name="blood_type"
                      value={editingPatient.blood_type || ""}
                      onChange={handlePatientInputChange}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full p-2 border rounded"
                      placeholder="Blood Type"
                    />
                    <input
                      name="haveallergy"
                      value={editingPatient.haveallergy || ""}
                      onChange={handlePatientInputChange}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full p-2 border rounded"
                      placeholder="Allergies"
                    />
                    <input
                      name="chronic_diseases"
                      value={editingPatient.chronic_diseases || ""}
                      onChange={handlePatientInputChange}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full p-2 border rounded"
                      placeholder="Chronic Diseases"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handlePatientSave}
                        className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <Save size={16} className="mr-1" /> Save
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPatient(null);
                        }}
                        className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <X size={16} className="mr-1" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Blood Type: {patient.blood_type || "Not Specified"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Allergies: {patient.haveallergy || "Not Specified"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Chronic Diseases:{" "}
                      {patient.chronic_diseases || "Not Specified"}
                    </p>
                    <button
                      onClick={(e) => handlePatientEdit(e, patient)}
                      className="mt-2 flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <Edit2 size={16} className="mr-1" /> Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b">
            Health Records
          </h2>
          {selectedPatient ? (
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">
                Records for {selectedPatient.username}
              </h3>
              <div className="space-y-4">
                {newRecord && (
                  <div className="border rounded p-4 bg-green-50">
                    <h4 className="font-semibold mb-2">New Record</h4>
                    <input
                      name="diagnosis"
                      value={newRecord.diagnosis || ""}
                      onChange={handleRecordInputChange}
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Diagnosis"
                    />
                    <input
                      name="drugs"
                      value={newRecord.drugs || ""}
                      onChange={handleRecordInputChange}
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Medications"
                    />
                    <input
                      name="treatment_plan"
                      value={newRecord.treatment_plan || ""}
                      onChange={handleRecordInputChange}
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Treatment Plan"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleRecordSave}
                        className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <Save size={16} className="mr-1" /> Save
                      </button>
                      <button
                        onClick={() => setNewRecord(null)}
                        className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <X size={16} className="mr-1" /> Cancel
                      </button>
                    </div>
                  </div>
                )}
                {patientRecords
                  .filter((record) => record.id === selectedPatient.id)
                  .map((record) => (
                    <div key={record.record_id} className="border rounded p-4">
                      {editingRecord?.record_id === record.record_id ? (
                        <>
                          <input
                            name="diagnosis"
                            value={editingRecord.diagnosis || ""}
                            onChange={handleRecordInputChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Diagnosis"
                          />
                          <input
                            name="drugs"
                            value={editingRecord.drugs || ""}
                            onChange={handleRecordInputChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Medications"
                          />
                          <input
                            name="treatment_plan"
                            value={editingRecord.treatment_plan || ""}
                            onChange={handleRecordInputChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Treatment Plan"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={handleRecordSave}
                              className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              <Save size={16} className="mr-1" /> Save
                            </button>
                            <button
                              onClick={() => setEditingRecord(null)}
                              className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              <X size={16} className="mr-1" /> Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p>
                            <strong>Diagnosis:</strong>{" "}
                            {record.diagnosis || "Not Available"}
                          </p>
                          <p>
                            <strong>Medications:</strong>{" "}
                            {record.drugs || "Not Available"}
                          </p>
                          <p>
                            <strong>Treatment Plan:</strong>{" "}
                            {record.treatment_plan || "Not Specified"}
                          </p>
                          <p>
                            <strong>Date:</strong>{" "}
                            {record.created_at
                              ? new Date(record.created_at).toLocaleString()
                              : "Not Specified"}
                          </p>
                          <div className="mt-2 flex space-x-2">
                            <button
                              onClick={() => handleRecordEdit(record)}
                              className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              <Edit2 size={16} className="mr-1" /> Edit
                            </button>
                            <button
                              onClick={() =>
                                handleRecordDelete(record.record_id)
                              }
                              className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              <Trash2 size={16} className="mr-1" /> Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                {patientRecords.filter(
                  (record) => record.id === selectedPatient.id
                ).length === 0 &&
                  !newRecord && (
                    <p className="text-gray-500 italic">
                      No health records available for this patient.
                    </p>
                  )}
              </div>
            </div>
          ) : (
            <div className="p-4 text-gray-500 italic">
              Select a patient to view their health records.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
