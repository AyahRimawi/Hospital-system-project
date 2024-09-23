// CREATE TABLE contacts (
//     contact_id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     message TEXT NOT NULL,
//     respond TEXT DEFAULT NULL
// );


// CREATE TABLE medical_staff (
//     staff_id SERIAL PRIMARY KEY,
//     staff_name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     profile_image VARCHAR(255),
//     specialty VARCHAR(50) NOT NULL,
//     bio TEXT,
//     is_approved BOOLEAN DEFAULT TRUE
// );

// CREATE TABLE patients (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(255) NOT NULL UNIQUE,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     gender VARCHAR(10) NOT NULL,
//     dob DATE NOT NULL,
//     is_approved BOOLEAN DEFAULT TRUE,
//     profile_image VARCHAR(255),
//     haveAllergy VARCHAR(255) DEFAULT 'NO',
//     chronic_diseases VARCHAR(255) DEFAULT 'NO',
//     blood_type VARCHAR(5)
// );

// CREATE TABLE admins (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL
// );



// CREATE TYPE appointment_status_enum AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

// CREATE TABLE appointments (
//     appointment_id SERIAL PRIMARY KEY,
//     available_id BIGINT NOT NULL,
//     id BIGINT NOT NULL,
//     status appointment_status_enum DEFAULT 'SCHEDULED',
//     is_Done BOOLEAN DEFAULT FALSE,
//     is_Deleted  BOOLEAN DEFAULT FALSE,
//     FOREIGN KEY (available_id) REFERENCES doctor_availability(available_id),
//     FOREIGN KEY (id) REFERENCES patients(id)
// );



// CREATE TABLE doctor_availability (
//     available_id SERIAL PRIMARY KEY,
//     staff_id INT NOT NULL,
//     available_start_date DATE NOT NULL,
//     available_end_date DATE,
//     available_start_time TIME NOT NULL,
//     available_end_time TIME NOT NULL,
//      is_booked BOOLEAN DEFAULT FALSE,
//      is_deleted BOOLEAN DEFAULT FALSE,
//     FOREIGN KEY (staff_id) REFERENCES medical_staff(staff_id),
//     UNIQUE (staff_id, available_start_date, available_start_time)
// );


// CREATE TABLE payments (
//     payment_id SERIAL PRIMARY KEY,
//     appointment_id BIGINT NOT NULL,
//     value INTEGER NOT NULL,
//     FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
// );




// CREATE TABLE healthcare_records (
//     record_id SERIAL PRIMARY KEY,
//     id BIGINT NOT NULL,
//     staff_id INT NOT NULL,
//     diagnosis TEXT NOT NULL,
//     tests VARCHAR(255),
//     rays VARCHAR(255),
//     drugs TEXT,
//     treatment_plan TEXT,
//     instructions TEXT,
//     is_deleted BOOLEAN DEFAULT FALSE,
//     FOREIGN KEY (id) REFERENCES patients(id),
//     FOREIGN KEY (staff_id) REFERENCES medical_staff(staff_id)
// );



//////////////////


// CREATE TABLE doctor_comments (
//     comment_id SERIAL PRIMARY KEY,
//     doctor_id INT NOT NULL,
//     patient_id INT NOT NULL,
//     parent_comment_id INT,
//     comment_text TEXT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (doctor_id) REFERENCES medical_staff(staff_id),
//     FOREIGN KEY (patient_id) REFERENCES patients(id),
//     FOREIGN KEY (parent_comment_id) REFERENCES doctor_comments(comment_id)
// );


// CREATE TABLE feedback (
//     id SERIAL PRIMARY KEY,
//     FOREIGN KEY (id) REFERENCES patients(id),
//     content TEXT NOT NULL,
//     rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     is_deleted BOOLEAN DEFAULT FALSE
//   );


//  Create the notifications table with all columns and constraints
// CREATE TABLE notifications (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER NOT NULL,
//     doctor_id INTEGER,
//     message TEXT NOT NULL,
//     comment_id INTEGER,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     read BOOLEAN DEFAULT FALSE,
//     FOREIGN KEY (user_id) REFERENCES patients(id),
//     FOREIGN KEY (doctor_id) REFERENCES medical_staff(staff_id)
// );

// CREATE TABLE payments (
//     payment_id SERIAL PRIMARY KEY,
//     appointment_id BIGINT NOT NULL,
//     user_id BIGINT NOT NULL,       -- Added this column to track which user made the payment
//     amount DECIMAL(10, 2) NOT NULL,  --
//     payment_status VARCHAR(50) NOT NULL, -- Track the status of the payment
//     FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
// );


// CREATE TABLE reviews(
//     review_id SERIAL PRIMARY KEY,
//     appointment_id BIGINT NOT NULL,
//     patient_id BIGINT NOT NULL,
//     staff_id BIGINT NOT NULL,
//     rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
//     review_content TEXT,
//     created_at TIMESTAMP DEFAULT NOW(),
//     FOREIGN KEY(appointment_id) REFERENCES appointments(appointment_id),
//     FOREIGN KEY(patient_id) REFERENCES patients(id),
//     FOREIGN KEY(staff_id) REFERENCES medical_staff(staff_id)
// );