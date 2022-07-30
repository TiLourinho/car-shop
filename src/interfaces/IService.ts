interface IService<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T[]>,
  readOne(str: string): Promise<T>
}

export default IService;
export { IService };