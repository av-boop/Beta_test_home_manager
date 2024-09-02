function MemberCard({ member, key }) {
  const { id, member_name } = member;

  return (
    <tbody>
      <tr>
        <th scope="row">{id}.</th>
        <td>{member_name}</td>
      </tr>
    </tbody>
  );
}

export default MemberCard;
