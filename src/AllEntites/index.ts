import { Role } from '../roles/entities/role.entity';
import { UserCredential } from '../defaultmodule/users/entities/UserCredential.entities';
import { User } from '../defaultmodule/users/entities/user.entity';

const entities = [Role, User, UserCredential];

export { Role, User, UserCredential };
export default entities;
