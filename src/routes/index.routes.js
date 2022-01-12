import express from 'express';
import mutationController from '../controller/mutation.controller';

const router = express.Router();

router.post('/mutation', async (req, res) => {
  const { dna } = req.body;

  const hasMutation = await mutationController.hasMutation(dna);

  return res.status(hasMutation.code).json(hasMutation.message);
});

export default router;
