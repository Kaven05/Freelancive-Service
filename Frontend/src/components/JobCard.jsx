import React from "react";
import { FaUsers, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobCard = ({ jobid, title, description, skills, count, postedBy }) => {
  return (
    <Link to={`/applyjob/${jobid}`} className="block">
      <div className="bg-white rounded-xl p-4 shadow-lg border hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>

        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mb-2">
          {skills}
        </span>

        <div className="flex justify-between items-center mt-3 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            <FaUsers /> {count} Enrolled
          </span>
          <span className="flex items-center gap-1">
            <FaUserTie /> {postedBy}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
