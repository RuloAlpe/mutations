import AdnModel from '../models/adn.model';

const hasMutation = (dna) => {
  return new Promise(async (resolve, reject) => {
    try {
      const matrix = await convertToMatrix(dna);
      const verticalToHorizontal = transformVerticalToHorizontal(matrix);

      const horizontal1 = mutationHorizontal(dna);
      const horizontal2 = mutationHorizontal(verticalToHorizontal);
      if (horizontal1 || horizontal2) {
        await AdnModel.create({
          has_mutation: true,
        });

        resolve({
          code: 200,
          message: 'Has mutation',
        });
      } else {
        await AdnModel.create({
          has_mutation: false,
        });

        resolve({
          code: 403,
          message: 'No has mutation',
        });
      }

      // return resolve(horiz);
    } catch (error) {
      return reject(error);
    }
  });
};

const convertToMatrix = (dna) => {
  return new Promise(async (resolve) => {
    let matrix = [];
    dna.forEach((data, index) => {
      const newArray = data.split('');
      matrix[index] = [...newArray];
    });
    resolve(matrix);
  });
};

// const validateChar = (matrix) => {
//   return new Promise(async (resolve,reject) => {
//     //   try {
//     matrix.forEach((row) => {
//       row.forEach((col) => {
//         console.log(col);
//         if (!(col !== 'A' && col !== 'T' && col !== 'C' && col !== 'G')) {
//           // reject({success: false});
//           return reject('error');
//         } else {
//           return resolve('success');
//         }
//       });
//     });
//   // resolve({success: true});
//   //   } catch(error){
//   //     reject(error);

//   //   }
//   });
// };

const mutationHorizontal = (dna) => {
  const dataA = 'AAAA';
  const dataT = 'TTTT';
  const dataC = 'CCCC';
  const dataG = 'GGGG';
  let flag = false;

  dna.forEach((data) => {
    const hasA = data.includes(dataA);
    const hasT = data.includes(dataT);
    const hasC = data.includes(dataC);
    const hasG = data.includes(dataG);

    if (hasA || hasT || hasC || hasG) {
      flag = true;
    }
  });

  return flag;
};

const transformVerticalToHorizontal = (matrix) => {
  let newArray = [];

  for(let i = 0; i < matrix.length; i++) {
    let newString = '';
    for(let j = 0; j < matrix.length; j++) {
      newString += matrix[j][i];
    }
    newArray.push(newString);
  }
  return newArray;
};

export default {
  hasMutation,
}