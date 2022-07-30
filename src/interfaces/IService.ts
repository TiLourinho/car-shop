interface IService<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T[]>,
  readOne(str: string): Promise<T | null>,
  update(str: string, obj: T): Promise<T | null>
}

export default IService;
export { IService };