import { v4 } from 'uuid';

export const createEntityId = () => v4().split('-').join('');