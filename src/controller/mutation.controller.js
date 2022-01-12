import AdnModel from '../models/adn.model';

const hasMutation = (dna) => {
  return new Promise(async (resolve, reject) => {
    try {
      const matrix = await convertToMatrix(dna);

      const validation = validateChar(matrix);
      if (!validation) {
        resolve({
          code: 500,
          message: 'Invalid data',
        });
      }
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
      }

      await AdnModel.create({
        has_mutation: false,
      });

      resolve({
        code: 403,
        message: 'No has mutation',
      });
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

const validateChar = (matrix) => {
  let flag = true;

  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] == 'A' || matrix[i][j] == 'T' || matrix[i][j] == 'C' || matrix[i][j] == 'G'){
        continue;
      } else {
        flag = false;
        i = matrix.length;
        j = matrix.length;
      }
    }
  }

  return flag;
};

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

const stats = () => {
  return new Promise(async (resolve, reject) => {
    try {
      
      const hasMutations = await AdnModel.find({
        has_mutation: true,
      }).count();

      const noHasMutations = await AdnModel.find({
        has_mutation: false,
      }).count();

      return resolve({
        count_mutations: hasMutations,
        count_no_mutation: noHasMutations,
        ratio: hasMutations / noHasMutations,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

export default {
  hasMutation,
  stats,
  convertToMatrix,
  mutationHorizontal,
  transformVerticalToHorizontal,
  validateChar,
}