
import { https, logger as log } from "firebase-functions";

import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';


const typeDefs = gql`
  type Skill {
    name: String;
  }
  type Query {
    skills: [Skill]
  }
`;

export const helloWorld = https.onRequest((_, res) => {
  log.info("Hello logs!", {structuredData: true});
  res.send("Hello from Firebase!");
});
