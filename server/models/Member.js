// Hardcoded Schema Structure for Member
export const MemberSchema = {
  name: 'String (required)',
  email: 'String (required, unique)',
  phone: 'String (required)',
  membershipDate: 'Date',
};

export default MemberSchema;
