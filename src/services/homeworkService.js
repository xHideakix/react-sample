import 'react';
import { findIndex } from 'lodash';

const BACKEND_SERVER = 'https://promise-server.herokuapp.com';
// const BACKEND_SERVER = 'http://localhost:5000';

export class HomeworkService {
  async fetchList() {
    const data = await fetch(`${BACKEND_SERVER}/api/homeworks`);
    const list = data.json();
    return list;
  }

  async deleteOne(id) {
    await fetch(`${BACKEND_SERVER}/api/homeworks/${id}`, {
      method: 'DELETE'
    });
    return await this.fetchList();
  }

  async updateOne(lesson) {
    const req = await fetch(`${BACKEND_SERVER}/api/homeworks/${lesson.id}`, {
      method: 'PUT',
      body: JSON.stringify(lesson)
    });
    const homeworks = await this.fetchList();
    const result = await req.json();
    const index = findIndex(homeworks, { id: result.id });
    if (index > -1) {
      const newHomeworks = [...homeworks];
      newHomeworks[index] = result;
      return newHomeworks;
    }  
  }
}