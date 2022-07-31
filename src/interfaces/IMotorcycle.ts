import { z } from 'zod';
import { motorcycleSchema } from '../schemas';

type IMotorcycle = z.infer<typeof motorcycleSchema>;

export default IMotorcycle;
export { IMotorcycle };