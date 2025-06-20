import connectDB from "../db.js";
import { ObjectId } from "mongodb";

const db = await connectDB();
const services = db.collection('services');

class CServices {
  constructor() {}

  async initializeService() {
    let doc = await services.insertOne({ _name: 'unnamed' });
    return doc.insertedId.toString();
  }
  
  async update(id: string, action: string, data: object) {
    if (action == 'append') {
      const response = services.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
      return response;
    }
    else if (action == 'remove') {
      const unsetKeys = Object.fromEntries(
        Object.keys(data).map(key => [key, ''])
      );
      const response = await services.updateOne(
        { _id: new ObjectId(id) },
        { $unset: unsetKeys }
      );
      return response;
    }
    else return false;
  }

  async delete(id: string) {
    return await services.deleteOne({ _id: new ObjectId(id) });
  }
}

export default CServices;