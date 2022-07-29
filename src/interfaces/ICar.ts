import { z } from 'zod';
import { carSchema } from '../schemas';

type ICar = z.infer<typeof carSchema>;

export default ICar;
export { ICar };