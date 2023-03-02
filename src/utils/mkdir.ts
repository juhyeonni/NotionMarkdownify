import * as fs from 'fs';

function mkdir(location: string) {
  fs.mkdir(location, { recursive: false }, (err) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.log(`Directory already exists at ${location}, continue to build`);
      } else {
        console.error(`An error occurred while creating the directory: ${err}`);
      }
    }
  });
}

export default mkdir;
