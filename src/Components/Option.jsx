import React from "react";

function Option({ user }) {
  return <option value={user.id}>{user.name}</option>;
}

export default Option;
