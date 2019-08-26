import {Db, MongoClient} from "mongodb";
import ViewLogs from "../log/ViewLog";

class MongoWrapper {
    private readonly host: string = "mongo";
    private readonly port: string = "27017";
    private readonly db: string = "hospital";
    private readonly url: string = "mongodb://" + this.host + ":" + this.port + "/" + this.db;

    private connect: Db;

    public async getConnect(): Db {
        try {
            if (this.connect == null) {
                this.connect = await MongoClient.connect(this.url);
            }
            return this.connect;
        } catch (e) {
            ViewLogs.error("Unable to connect to db");
        }
    }
}

export default MongoWrapper;
