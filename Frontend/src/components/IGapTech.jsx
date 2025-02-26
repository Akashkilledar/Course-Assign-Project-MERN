import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import "../assets/igapstyle.css"

function IGapTech() {

    const [studentsData, setStudentsData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [id, setID] = useState(undefined)
    const [activeModal, setActiveModal] = useState(null);
    const [activeTable, setActiveTable] = useState(null);

    const [assignedCoursesData, setAssignedCoursesData] = useState([]);
    
    const [getStudentList, setGetStudentList] = useState({ studentID: '' });
    
    const [students, setStudents] = useState({
        name: "",
        surname: "",
        email: "",
        qualification: "",
        mobile: ""
    });
    
    const [course, setCourse] = useState({
        name: "",
        fees: "",
        duration: "",
        description: ""
    });
    
    const [assignedCourse, setAssignedCourse] = useState({
        studentID: "",
        courseID: ""
    });
    

    function handleChangeForStudent(e) {
        setStudents({ ...students, [e.target.id]: e.target.value });
    }

    function handleSubmitForStudents(e) {
        e.preventDefault();

        if (id === undefined) {

            axios.post(import.meta.env.VITE_API_STUDENTS_KEY, students)
                .then((res) => {
                    console.log(res.data.data);
                    loadStudents();
                });
            setStudents({
                name: "",
                surname: "",
                email: "",
                qualification: "",
                mobile: ""
            });
        } else {
            axios.put(import.meta.env.VITE_API_STUDENTS_KEY + `/${id}`, students)
                .then((res) => {
                    console.log(res.data.data);
                    loadStudents();

                    setStudents({
                        name: "",
                        surname: "",
                        email: "",
                        qualification: "",
                        mobile: ""
                    });
                    setID(undefined)
                }).catch((err) => {
                    console.log(err);

                })

        }
    }

    function loadStudents() {
        axios.get(import.meta.env.VITE_API_STUDENTS_KEY)
            .then((res) => {
                setStudentsData(res.data.data);
            });
    }

    function removeStudent(id) {
        // alert(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(import.meta.env.VITE_API_STUDENTS_KEY + `/${id}`)
                    .then((res) => {
                        console.log(res.data.data);
        
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success"
                        });

                        loadStudents()
                    })
                }
          });
          
    };


    function updateStudentInfo(id) {
        // alert(id)
        setID(id)
        axios.get(import.meta.env.VITE_API_STUDENTS_KEY + `/${id}`)
            .then((res) => {
                console.log(res.data.data);
                loadStudents()

                setStudents({
                    name: res.data.data.name,
                    surname: res.data.data.surname,
                    email: res.data.data.email,
                    qualification: res.data.data.qualification,
                    mobile: res.data.data.mobile
                })

            })
    }

    function handleChangeForCourse(e) {
        setCourse({ ...course, [e.target.id]: e.target.value });
    }

    function handleSubmitForCourse(e) {
        e.preventDefault();
        if (id === undefined) {

            axios.post(import.meta.env.VITE_API_COURSES_KEY, course)
                .then((res) => {
                    console.log(res.data.data);
                    loadCourses();
                });
            setCourse({
                name: "",
                fees: "",
                duration: "",
                description: ""
            });
        } else {
            axios.put(import.meta.env.VITE_API_COURSES_KEY + `/${id}`, course)
                .then((res) => {
                    console.log(res.data.data);
                    loadCourses();

                    setCourse({
                        name: "",
                        fees: "",
                        duration: "",
                        description: ""
                    });
                    setID(undefined);

                })
        }
    }

    function loadCourses() {
        axios.get(import.meta.env.VITE_API_COURSES_KEY)
            .then((res) => {
                setCourseData(res.data.data);
            });
    }

    function removeCourse(id) {
        // alert(id)
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(import.meta.env.VITE_API_COURSES_KEY + `/${id}`)
                    .then((res) => {
                        console.log(res.data.data);
        
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success"
                        });

                        loadCourses();
                    })
            }
          });
          
    };

    function updateCourseInfo(id) {
        // alert(id)
        setID(id);
        axios.get(import.meta.env.VITE_API_COURSES_KEY + `/${id}`)
            .then((res) => {

                console.log(res.data.data);
                loadCourses();
                setCourse({
                    name: res.data.data.name,
                    fees: res.data.data.fees,
                    duration: res.data.data.duration,
                    description: res.data.data.description

                });

            })
    };

    useEffect(() => {
        loadStudents();
        loadCourses();
    }, []);

    function handleAssignCourse() {
        if (!assignedCourse.studentID || !assignedCourse.courseID) {
            alert("Please select both a student and a course.");
            return;
        }

        const newEntry = {
            studentID: assignedCourse.studentID,
            courseID: assignedCourse.courseID,
        };

        axios.post(import.meta.env.VITE_API_ASSIGNED_COURSES_KEY, newEntry)
            .then((res) => {
                console.log(res.data.data);
                setAssignedCourse({
                    studentID: "",
                    courseID: ""
                });

                setActiveModal(null); // Close modal after successful assignment
            })
            .catch((err) => {
                console.error("Error assigning course:", err);
                alert("Failed to assign course. Please try again.");
            });
    }


    useEffect(() => {
        if (getStudentList.studentID && activeModal !== 'assignCourse') {
            console.log("Fetching assigned courses for student:", getStudentList.studentID);

            axios.get(import.meta.env.VITE_API_ASSIGNED_COURSES_KEY + `/${getStudentList.studentID}`)
                .then((res) => {
                    console.log("Assigned courses response:", res.data.data);
                    if (res.status === 200 && res.data.status === "Success") {
                        const data = Array.isArray(res.data.data) ? res.data.data : [];
                        console.log("Assigned courses data:", data);
                        setAssignedCoursesData(data);

                        // getStudentList(data)
                    } else {
                        console.error("Unexpected response status:", res.status, res.data);
                        setAssignedCoursesData([]);
                    }
                })
                .catch((err) => {
                    console.error("Error fetching assigned courses:", err);
                    setAssignedCoursesData([]);
                });
        }
    }, [getStudentList.studentID]);


    const handleAction = (type, id = null) => {

        if (type === "modal") {

            setActiveTable(null); // Hide any visible table
            setActiveModal(id); // Open the selected modal
            setGetStudentList({ studentID: "" }); // Ensure student details are hidden

        } else if (type === "table") {
            setActiveModal(null); // Close any open modal
            setActiveTable(prevTable => (prevTable === id ? null : id)); // Toggle table
            setGetStudentList({ studentID: "" }); // Ensure student details are hidden when opening a table

        } else if (type === "studentSelect") {

            setActiveTable(null); // Hide table when selecting a student
            setActiveModal(null); // Close modal if any
        }

        loadStudents();
        loadCourses();
    };



    const closeModal = (id) => {
        if (!id) {
            // If no ID is provided, assume it's the student modal
            setStudents({
                name: "",
                surname: "",
                email: "",
                qualification: "",
                mobile: "",
            });
            return;
        }

        switch (id) {
            case "studentModal":
                setStudents({
                    name: "",
                    surname: "",
                    email: "",
                    qualification: "",
                    mobile: "",
                });
                break;
            case "courseModal":
                setCourse({
                    name: "",
                    fees: "",
                    duration: "",
                    description: "",
                });
                break;
            case "assignCourseModal":
                setAssignedCourse({
                    studentId: "",
                    courseId: "",
                });
                break;
            default:
                break;
        }
    };


    


    return (
        <>

        <div className="container-fluid mt-3">
            <div className="row mt-2">

                <div className="col-lg-3 d-flex flex-column p-2" style={{ height: "100vh", position:"sticky", top:"0" }}>
                    <div className="flex-grow-1">
                        <select className="form-control m-2 w-100" value={getStudentList.studentID} onChange={(e) => { setGetStudentList({ ...getStudentList, studentID: e.target.value }), handleAction("studentSelect") }}>
                            <option>---Select Student---</option>
                            {studentsData.map((eachvalue) => (
                                <option key={eachvalue._id} value={eachvalue._id}>{eachvalue.name + " " + eachvalue.surname}</option>
                            ))}
                        </select>

                        <button type="button" class="btn btn-info m-2 w-100" data-bs-toggle="modal" data-bs-target="#studentModal" onClick={() => handleAction("modal", "studentModal")}>
                            Add Student
                        </button>
                        <button type="button" class="btn btn-success m-2 w-100" data-bs-toggle="modal" data-bs-target="#courseModal" onClick={() => handleAction("modal", "courseModal")}>
                            Add Course
                        </button>

                        <button type="button" class="btn btn-warning m-2 w-100" data-bs-toggle="modal" data-bs-target="#assignCourseModal" onClick={() => handleAction("modal", "assignCourseModal")}>
                            Assign Course
                        </button>

                    </div>

                    {/* Bottom Buttons */}
                    <div className="mt-auto mb-5 text-center">
                        <button className="btn btn-info m-2 " onClick={() => handleAction("table", 'student')}>All Students</button>
                        <button className="btn btn-success m-2 " onClick={() => handleAction("table", 'courses')}>All Courses</button>
                    </div>
                </div>

                <div className="col-lg-9">

                    
                   {/* <!-- Student Info Cards --> */}
                    {getStudentList?.studentID && getStudentList.studentID !== "" && (
                        <div>
                            <div className="row">


                            {getStudentList.studentID && (() => {
                                const selectedStudent = studentsData.find(student => student._id === getStudentList.studentID);
                                return selectedStudent ? (
                                    <div className="col-lg-4">

                                    <div className="card my-2 bg-light  shadow-sm hover-shadow">
                                        <h5 className="card-header">Student Information</h5>
                                        <div className="card-body">
                                            <p><strong>Name:</strong> {selectedStudent.name} {selectedStudent.surname}</p>
                                            <p><strong>Email:</strong> {selectedStudent.email}</p>
                                            <p><strong>Qualification:</strong> {selectedStudent.qualification}</p>
                                            <p><strong>Mobile:</strong> {selectedStudent.mobile}</p>
                                        </div>
                                    </div>
                                    </div>
                                ) : null;
                            })()}

                            </div>


                            {/* Display the assigned courses of the selected student */}

                            <div className="row">
                              {  assignedCoursesData.length > 0 ? (
                                  assignedCoursesData.filter(assignedCourseData => assignedCourseData.courseID) // Ensure courseID exists
                                  
                                  .map((assignedCourseData) => {
                                      
                                      return (
                                        
                                          <div key={assignedCourseData._id} className="col-lg-4 ">

                                                    <div className="card bg-light my-2  shadow-sm hover-shadow">

                                                    <h5 className="card-header">Assigned Course</h5>
                                                    <div className="card-body">
                                                        <p><strong>Course Name:</strong> {assignedCourseData.courseID?.name}</p>
                                                        <p><strong>Course Duration:</strong> {assignedCourseData.courseID?.duration}</p>
                                                        <p><strong>Course Fees:</strong> {assignedCourseData.courseID?.fees}</p>
                                                        <p><strong>Course Description:</strong> {assignedCourseData.courseID?.description}</p>
                                                    </div>
                                                    </div>
                                          </div>
                                            )
                                        })
                                    ) : null
                                }

                                
                            </div>

                        </div>
                    )}
                    

                    {/* <!-- Student Modal --> */}
                    <div class="modal fade" id="studentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal("studentModal")}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input value={students.name} onChange={handleChangeForStudent} id='name' type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Surname</label>
                                            <input value={students.surname} onChange={handleChangeForStudent} id='surname' type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input value={students.email} onChange={handleChangeForStudent} id='email' type="email" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Qualification</label>
                                            <input value={students.qualification} onChange={handleChangeForStudent} id='qualification' type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Mobile</label>
                                            <input value={students.mobile} onChange={handleChangeForStudent} id='mobile' type="number" className="form-control" />
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => closeModal("studentModal")}>Close</button>
                                    <button type="button" class="btn btn-primary" onClick={handleSubmitForStudents}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Course Modal --> */}
                    <div class="modal fade" id="courseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal("courseModal")}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input value={course.name} onChange={handleChangeForCourse} id='name' type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Fees</label>
                                            <input value={course.fees} onChange={handleChangeForCourse} id='fees' type="number" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Duration</label>
                                            <input value={course.duration} onChange={handleChangeForCourse} id='duration' type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <input value={course.description} onChange={handleChangeForCourse} id='description' type="text" className="form-control" />
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => closeModal("courseModal")}>Close</button>
                                    <button type="button" class="btn btn-primary" onClick={handleSubmitForCourse}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assign Course Modal */}
                    <div class="modal fade" id="assignCourseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal("assignCourseModal")}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <select className="form-control m-1" value={assignedCourse.studentID || ""} onChange={(e) => setAssignedCourse({ ...assignedCourse, studentID: e.target.value })}>
                                            <option value={""}>---Select Student---</option>
                                            {studentsData.map((eachvalue) => (
                                                <option key={eachvalue._id} value={eachvalue._id}>{eachvalue.name + " " + eachvalue.surname}</option>
                                            ))}
                                        </select>
                                        <select className="form-control m-1" value={assignedCourse.courseID || ""} onChange={(e) => setAssignedCourse({ ...assignedCourse, courseID: e.target.value })}>
                                            <option value={""}>---Select Course---</option>
                                            {courseData.map((eachvalue) => (
                                                <option key={eachvalue._id} value={eachvalue._id}>{eachvalue.name}</option>
                                            ))}
                                        </select>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => closeModal("assignCourseModal")}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleAssignCourse}>Assign Course</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* All Students Data Table */}
                    {activeTable === 'student' && (

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Surname</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Qualification</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentsData.map((eachdata, i) => {
                                        return (
                                            <tr key={eachdata.id}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{eachdata.name}</td>
                                                <td>{eachdata.surname}</td>
                                                <td>{eachdata.email}</td>
                                                <td>{eachdata.qualification}</td>
                                                <td>{eachdata.mobile}</td>
                                                <td>
                                                    <button className='btn btn-primary m-1' data-bs-toggle="modal" data-bs-target="#studentModal" onClick={(() => updateStudentInfo(eachdata._id))}><i class="fa-solid fa-pencil"></i></button>
                                                    <button className='btn btn-danger' onClick={(() => removeStudent(eachdata._id))}><i class="fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>

                                        )

                                    })
                                }
                            </tbody>
                        </table>
                    )}

                    {/* All Courses Data Table */}
                    {activeTable === 'courses' && (

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Fees</th>
                                    <th scope="col">Duration</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    courseData.map((eachdata, i) => {
                                        return (

                                            <tr key={eachdata.id}>
                                                <th scope='row'>{i + 1}</th>
                                                <td>{eachdata.name}</td>
                                                <td>{eachdata.fees}</td>
                                                <td>{eachdata.duration}</td>
                                                <td style={{ width: "400px", whiteSpace: "normal", wordBreak: "break-word" }}>{eachdata.description}</td>

                                                <td>
                                                    <button className='btn btn-primary m-1' data-bs-toggle="modal" data-bs-target="#courseModal" onClick={(() => updateCourseInfo(eachdata._id))}><i class="fa-solid fa-pencil"></i></button>
                                                    <button className='btn btn-danger' onClick={(() => removeCourse(eachdata._id))} ><i class="fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )}

                </div>
            </div>
        </div>
       
        </>
    );
}

export default IGapTech;
