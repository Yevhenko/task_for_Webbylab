import { getRepository } from 'typeorm';
import { IUser } from '@components/user/interfaces';
import { User } from '../../db/models/User';
import { Film } from '../../db/models/Film';

export const buildUser = async (data: IUser): Promise<IUser> => {
  const user = getRepository(User).create(data);
  return await getRepository(User).save(user);
};

export const getUser = async (email: string): Promise<IUser | null> => {
  const user = await getRepository(User).findOne({
    where: {
      email: email,
    },
  });

  if (!user) return null;

  return user;
};
