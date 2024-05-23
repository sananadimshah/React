import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { userId } = useParams();
  return (
    <div className="bg-orange-500 text-white p-4 text-center text-3xl">
      User:{userId}
    </div>
  );
};

export default User;
