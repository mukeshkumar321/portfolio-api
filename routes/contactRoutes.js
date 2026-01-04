import express from 'express';
const router = express.Router();
import {
  getContacts,
  createContact,
  deleteContact
} from '../controllers/contactController.js';

router.route('/')
  .get(getContacts)
  .post(createContact);

router.route('/:id')
  .delete(deleteContact);

export default router;
