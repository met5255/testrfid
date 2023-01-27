/* eslint-disable no-console */
import { AdminRole } from '../models/adminRole';
import { AdminUsers } from '../models/adminUsers';
import { Encrypt } from './passwordcrypt';
import {adminRole, adminUser} from '../configs/defaultAdminUser';

export const createDefaultSuperAdminUser = async () => {


  const isExistAdminRole: AdminRole | null = await AdminRole.findOne({where: { adminId: 1 }});
  if (!isExistAdminRole) {
    await AdminRole.create({...adminRole});
    console.log('Success default Admin Role added!');
  }
  
  const isExistAdminUser: AdminUsers | null = await AdminUsers.findOne({where: { username: 'SuperAdmin' }});
  if (!isExistAdminUser) {
    adminUser.password = await Encrypt.cryptPassword(adminUser.password);
    await AdminUsers.create({...adminUser});
    console.log('Success default Admin User Create!');
  }
};