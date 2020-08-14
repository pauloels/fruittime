import Fruit from '../models/Fruit';
import ICreateFruitDTO from '../dtos/ICreateFruitDTO';

export default interface IUsersRepository {
    findByName(fruit: string): Promise<Fruit | undefined>;
    findById(id: string): Promise<Fruit | undefined>;
    create(data: ICreateFruitDTO): Promise<Fruit>;
    save(fruit: Fruit): Promise<Fruit>;
}
