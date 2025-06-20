import { Router } from "express";
import CServices from "../controllers/services";

const Rservice = Router();
const cservices = new CServices();

Rservice.post('/init', async (req, res) => {
  try {
    const id = await cservices.initializeService();
    res.status(200).json({ id });
    return;
  }
  catch {
    res.status(500).json({ error: 'Internal error' });
    return;
  }
});

Rservice.post('/update', async (req, res) => {
  try {
    const { id, action, data } = req.body;
    if (!id || !action || !data) {
      res.status(401).json({ error: 'all fields are required' });
      return;
    }
    const response = await cservices.update(id, action, data);
    if (response == false) {
      res.status(401).json({ error: 'bad action' });
      return;
    }
    res.status(200).json({
      modified: response.modifiedCount
    });
    return;
  }
  catch {
    res.status(500).json({ error: 'Internal error' });
    return;
  }
});

Rservice.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(404).json({ error: 'id param is required' });
      return;
    }
    const response = await cservices.delete(id);
    const deletedN = response.deletedCount;
    if (deletedN == 0) {
      res.status(400).json({ error: 'not document found' });
      return;
    }
    res.status(200).json({
      id,
      deleted: deletedN
    });
    return;
  }
  catch {
    res.status(500).json({ error: 'Internal error' });
    return;
  }
});

export default Rservice;