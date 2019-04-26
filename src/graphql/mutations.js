import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
    $dob: DateTime!
    $gender: String!
    $ethnicity: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      dob: $dob
      gender: $gender
      ethnicity: $ethnicity
    ) {
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const UPDATE_DEMOGRAPHICS_MUTATION = gql`
  mutation UPDATE_DEMOGRAPHICS_MUTATION(
    $dob: DateTime!
    $gender: String!
    $ethnicity: String!
  ) {
    updateUserDemographics(dob: $dob, gender: $gender, ethnicity: $ethnicity) {
      id
    }
  }
`;
// TODO
/* TODO
 * - add conditions
 * - prev treatment
 */
export const CREATE_SCAR_MUTATION = gql`
  mutation CREATE_SCAR_MUTATION(
    $bodySites: [String!]!
    $causes: [String!]!
    $conditions: [String!]!
    $prevTreatment: Boolean!
    $image: String!
    $posasScore: Int!
    $addedAt: DateTime!
    $date: DateTime!
  ) {
    createScar(
      bodySites: $bodySites
      causes: $causes
      conditions: $conditions
      prevTreatment: $prevTreatment
      image: $image
      posasScore: $posasScore
      addedAt: $addedAt
      date: $date
    ) {
      id
    }
  }
`;
