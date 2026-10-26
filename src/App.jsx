
import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("register");
  const [welcome, setWelcome] = useState("");

  useEffect(() => {
    setWelcome("Welcome to the Student Registration System!");
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !age || !course.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (Number(age) < 1 || Number(age) > 120) {
      alert("Please enter an age between 1 and 120.");
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

    // Clear the registration form
    setName("");
    setAge("");
    setCourse("");
    setSearch("");

    // Navigate to the Registered Students page
    setPage("students");
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  function deleteStudent(id) {
    setStudents((previousStudents) =>
      previousStudents.filter((student) => student.id !== id)
    );
  }

  function goToRegistration() {
    setPage("register");
  }

  return (
    <div className="app">
      <header className="header">
        <p className="subtitle">ELIDYGRAM • STUDENT MANAGEMENT</p>
        <h1>Student Registration System</h1>
        <p>Register students and manage their information.</p>
      </header>

      {welcome && (
        <div className="welcome">{welcome}</div>
      )}

      <main className="container">
        {page === "register" ? (
          <section className="card registration-card">
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
                Register Student →
              </button>
            </form>

            <p className="page-note">
              Your student information will appear on the next page.
            </p>
          </section>
        ) : (
          <section className="card students-page">
            <div className="student-heading">
              <div>
                <p className="subtitle page-subtitle">
                  STUDENT DIRECTORY
                </p>
                <h2>Registered Students</h2>
                <p className="description">
                  Total students: {students.length}
                </p>
              </div>

              <button
                type="button"
                className="back-button"
                onClick={goToRegistration}
              >
                + Add Student
              </button>
            </div>

            <label htmlFor="search">
              Search by student name
            </label>
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
        )}
      </main>

      <footer>
        <p>© {new Date().getFullYear()} ELIDYGRAM. All rights reserved.</p>
        <p className="footer-subtitle">
          Student Registration System · Built with React
        </p>
      </footer>
    </div>
  );
}

export default App;
