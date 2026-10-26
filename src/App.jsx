
import { useEffect, useState } from "react";
import "./index.css";

function App() {
  // Store the form information
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");

  // Store registered students
  const [students, setStudents] = useState([]);

  // Store the search input
  const [search, setSearch] = useState("");

  // Welcome message
  const [welcome, setWelcome] = useState("");

  // Display a message when the app loads
  useEffect(() => {
    setWelcome("Welcome to the Student Registration System!");
  }, []);

  // Capture and submit the form
  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !age || !course.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (Number(age) < 1 || Number(age) > 120) {
      alert("Please enter a valid age.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      age: Number(age),
      course: course.trim(),
    };

    setStudents((previousStudents) => [
      ...previousStudents,
      newStudent,
    ]);

    // Clear the form after registration
    setName("");
    setAge("");
    setCourse("");
  }

  // Find students by name
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  // Remove a registered student
  function deleteStudent(id) {
    setStudents((previousStudents) =>
      previousStudents.filter((student) => student.id !== id)
    );
  }

  return (
    <div className="app">
      <header className="header">
        <p className="subtitle">STUDENT MANAGEMENT</p>
        <h1>Student Registration System</h1>
        <p>Register students and manage their information.</p>
      </header>

      {welcome && <div className="welcome">{welcome}</div>}

      <main className="container">
        <section className="card">
          <h2>Register a Student</h2>
          <p className="description">
            Enter the student's information below.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Student Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              min="1"
              max="120"
              required
            />

            <label htmlFor="course">Course</label>
            <input
              id="course"
              type="text"
              placeholder="Enter course name"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              required
            />

            <button type="submit" className="register-button">
              Register Student
            </button>
          </form>
        </section>

        <section className="card">
          <div className="student-heading">
            <div>
              <h2>Registered Students</h2>
              <p className="description">
                Total students: {students.length}
              </p>
            </div>
          </div>

          <label htmlFor="search">Search by student name</label>
          <input
            id="search"
            type="search"
            placeholder="Type a name to search..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {filteredStudents.length === 0 ? (
            <p className="empty">
              {students.length === 0
                ? "No students registered yet."
                : "No students match your search."}
            </p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Course</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.course}</td>
                      <td>
                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => deleteStudent(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <footer>
        Student Registration System | Built with React
      </footer>
    </div>
  );
}

export default App;
