import * as method from './method';
import * as dotenv from 'dotenv';
dotenv.config();

// Bring DatabaseID
const databaseID = process.env.DATABASE_ID ?? '';

// Bring BuildLocation
const buildLocation = 'build';

method.getPageIDs(databaseID).then((pageIDs) => {
  pageIDs.map((pageID) => {
    method.fileMDDocument(pageID, buildLocation);
  });
});

