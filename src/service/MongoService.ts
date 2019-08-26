import Db from "mongodb";
import Hospital from "../entity/Hospital";
import MongoWrapper from "../mongo/mongoWrapper";

class MongoService {

    private readonly nameCollection: string;

    constructor(nameCollection: string) {
        this.nameCollection = nameCollection;
    }

    public async getAll() {
        const db: Db = await new MongoWrapper().getConnect();
        return db.collection(this.nameCollection).find().toArray();
    }

    public async getOneById(value: string) {
        const db: Db = await new MongoWrapper().getConnect();
        return await db.collection(this.nameCollection).findOne({id: value.toString()});
    }

    public async getOneByCrm(value: string) {
        const db: Db = await new MongoWrapper().getConnect();
        return await db.collection(this.nameCollection).findOne({crm: value.toString()});
    }

    public async getAllByCrm(value: string) {
        const db: Db = await new MongoWrapper().getConnect();
        return db.collection(this.nameCollection).find({"medico.crm": value.toString()}).toArray();
    }

    public async getAllByCoren(value: string) {
        const db: Db = await new MongoWrapper().getConnect();
        return db.collection(this.nameCollection).find({"enfermeiros.coren": value.toString()}).toArray();
    }

    public async getOneByCoren(value: string) {
        const db: Db = await new MongoWrapper().getConnect();
        return await db.collection(this.nameCollection).findOne({coren: value.toString()});
    }

    public async insertOne(value: Hospital) {
        value.id = value.id.toString();
        const db = await new MongoWrapper().getConnect();
        return await db.collection(this.nameCollection).insertOne(value);
    }

    public async updateOne(valueId: string, value: Hospital) {
        value.id = value.id.toString();
        const db = await new MongoWrapper().getConnect();
        return await db.collection(this.nameCollection).updateOne({id: valueId.toString()}, {$set: value});
    }

    public async deleteOneById(value: string) {
        const db = await new MongoWrapper().getConnect();
        return await db.collection(this.nameCollection).deleteOne({id: value.toString()});
    }

    public async deleteOneByCrm(value: string) {
        const db = await new MongoWrapper().getConnect();
        return await db.collection(this.nameCollection).deleteOne({crm: value.toString()});
    }

    public async deleteOneByCoren(value: string) {
        const db = await new MongoWrapper().getConnect();
        return await db.collection(this.nameCollection).deleteOne({coren: value.toString()});
    }
}

export default MongoService;
