import React from "react";

interface Props {
  name: string;
  email: string;
  photoURL: string;
}

const UserProfileCard: React.FC<Props> = ({ name, email, photoURL }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl mx-auto text-center">
      <img
        src={photoURL}
        alt="Profile"
        className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-blue-500"
      />
      <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
      <p className="text-gray-500">{email}</p>
      <div className="mt-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
