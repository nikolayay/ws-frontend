import gql from "graphql-tag";

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      gender
      ethnicity
      dob
      scars {
        id
        bodySites
        causes
        posasScore
        addedAt
        date
        processingStatus
        test
      }
    }
  }
`;

export const RESEARCH_QUERY = gql`
  query RESEARCH_QUERY {
    scars {
      id
      bodySites
      causes
      conditions
      prevTreatment
      posasScore
      createdAt
      date
      user {
        id
        ethnicity
        gender
        dob
      }
    }
  }
`;

export const COUNT_SCARS_BY_CAUSE = gql`
  query COUNT_SCARS_BY_CAUSE {
    countScarsByCause {
      title
      chartData {
        key
        value
      }
    }
  }
`;

export const GET_SCARS_WITH_CAUSE = gql`
  query GET_SCARS_WITH_CAUSE($cause: String!) {
    scarsWithCause(cause: $cause) {
      title
      chartData {
        key
        value
      }
    }
  }
`;
