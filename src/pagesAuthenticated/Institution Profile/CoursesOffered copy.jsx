// import { useState } from 'react'

// const courses = {
//     ug: [
//         { id: 1, name: 'B.Tech Computer Science', duration: '4 Years', eligibility: '12th Science', mode: 'Offline' },
//         { id: 2, name: 'BBA', duration: '3 Years', eligibility: '12th Any Stream', mode: 'Hybrid' },
//     ],
//     pg: [
//         { id: 3, name: 'MBA', duration: '2 Years', eligibility: 'Graduation', mode: 'Online' },
//         { id: 4, name: 'M.Tech Data Science', duration: '2 Years', eligibility: 'B.Tech', mode: 'Offline' },
//     ],
// }

// export default function CoursesOffered() {
//     const [activeTab, setActiveTab] = useState('ug')
//     const [selectedCourse, setSelectedCourse] = useState(null)

//     return (
//         <div className="w-full p-6">
//             <div className="flex justify-center gap-6 mb-6">
//                 <button
//                     className={`px-6 py-2 rounded-md text-lg ${activeTab === 'ug' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//                     onClick={() => setActiveTab('ug')}>
//                     Undergraduate
//                 </button>
//                 <button
//                     className={`px-6 py-2 rounded-md text-lg ${activeTab === 'pg' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//                     onClick={() => setActiveTab('pg')}>
//                     Postgraduate
//                 </button>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {courses[activeTab].map((course) => (
//                     <div
//                         key={course.id}
//                         className="border rounded-lg p-4 text-center shadow-md">
//                         <h2 className="text-xl font-semibold">{course.name}</h2>
//                         <p className="text-gray-500">
//                             {course.duration} | {course.mode}
//                         </p>
//                         <p className="text-sm mt-2">Eligibility: {course.eligibility}</p>
//                         <button
//                             className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
//                             onClick={() => setSelectedCourse(course)}>
//                             View Details
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {/* Course Details Modal */}
//             {selectedCourse && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//                         <h3 className="text-xl font-bold">{selectedCourse.name}</h3>
//                         <p>
//                             <strong>Duration:</strong> {selectedCourse.duration}
//                         </p>
//                         <p>
//                             <strong>Mode:</strong> {selectedCourse.mode}
//                         </p>
//                         <p>
//                             <strong>Eligibility:</strong> {selectedCourse.eligibility}
//                         </p>
//                         <button
//                             className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
//                             onClick={() => setSelectedCourse(null)}>
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }



const CoursesOffered = () => {
  return (
    <div>CoursesOffered</div>
  )
}

export default CoursesOffered