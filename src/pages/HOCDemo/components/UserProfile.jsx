import React, { useEffect, useState } from "react";
import withLoading from "@/hoc/withLoading";
import httpRequest from "@/utils/httpRequest";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    httpRequest.get("/auth/me").then((res) => {
      setUser(res.data);
    });
  }, []);

  if (!user) return null;

  return (
    <div>
      <h3>User Profile</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default withLoading(UserProfile);
