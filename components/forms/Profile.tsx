import React from "react";

interface PrfileProps {
  clerkId: string;
  user: string;


const Profile = ({clerkId, user}: ProfileProps) => {

  const parsedUser = JSON.parse(user);

  return <div>Profile</div>;
};

export default Profile;
