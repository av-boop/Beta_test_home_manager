import { useEffect, useState } from "react";
import { getAllHouseholdMember } from "../../api/api";
import MemberCard from "./MemberCard";

function Profile(params) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadMember() {
      try {
        const memberData = await getAllHouseholdMember(abortController.signal);
        setMembers(memberData);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        }
      }
    }
    loadMember();
    return () => abortController.abort();
  }, []);

  const tableBody = members.map((member, key) => {
    return <MemberCard member={member} key={key} />;
  });
    
  return (
    <table className="table table-striped w-50">
      <thead>
        <tr>
          <th scope="col">S.No</th>
          <th scope="col">Member Name</th>
        </tr>
      </thead>
      {tableBody}
    </table>
  );
}

export default Profile;
