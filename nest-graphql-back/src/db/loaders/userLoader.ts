import * as DataLoader from 'dataloader';
import { getRepository } from 'typeorm';

import User from '../models/User.entity';

const batchTestes = async (userIds: number[]) => {
  const users = await getRepository(User).findByIds(userIds);

  const userIdMap: { [userId: number]: User } = {}

  users.forEach(teste => {
    userIdMap[teste.id] = teste;
  });

  return userIds.map(userId => userIdMap[userId]);
}

export default () => new DataLoader(batchTestes);