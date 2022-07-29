import { z } from 'zod';
import { vehicleSchema } from '../schemas';

type IVehicle = z.infer<typeof vehicleSchema>;

export default IVehicle;
export { IVehicle };