const pg = require('pg');

class CrudSql {
    app = {};
    tableName;
    fields;
    constructor(tableName, fields) {
        this.tableName = tableName;
        this.fields = fields;
    }

    getClient = () => {
        return new pg.Client({
            database: 'nodetesting',
            user: 'nodetestinguser',
            password: 'nodetestingpassword'
        });
    }
    testDb = async () => {
        const client = this.getClient();

        await client.connect();
        const res = await client.query('SELECT $1::text as message', ['Hello from postgres!']);
        console.log(res.rows[0].message); // Hello world!
        await client.end();
        return res.rows[0].message;
    };

    addCrudEndpoints = (app) => {

        app.get(`/${this.tableName}/fields`, (req, res) => {
            res.json([{ "name": "name", "type": "string" }])
        });
        // Create (POST) a new item
        app.post(`/${this.tableName}`, async (req, res) => {
            const newItem = req.body;
            await this.post(newItem);
            res.status(201).json(newItem);
        });

        // Read (GET) all items
        app.get(`/${this.tableName}`, async (req, res) => {
            const data = await this.get();
            res.json(data);
        });

        // Read (GET) a specific item by ID
        app.get(`/${this.tableName}/:id`, async (req, res) => {
            const id = parseInt(req.params.id);
            const item = await this.getSingle(id);
            if (!item) {
                res.status(404).json({ error: 'Item not found' });
            } else {
                res.json(item);
            }
        });

        // Update (PUT) an item by ID
        app.put(`/${this.tableName}/:id`, async (req, res) => {
            const id = parseInt(req.params.id);
            const updatedItem = req.body;
            const updatedRecord = await this.put(updatedItem.id, updatedItem)
            res.json(updatedRecord);
        });

        // Delete (DELETE) an item by ID
        app.delete(`/${this.tableName}/:id`, async (req, res) => {
            const id = parseInt(req.params.id);
            const deletedItem = await this.delete(id);
            res.json(deletedItem);
        });
    }
    get = async () => {
        const client = this.getClient();
        await client.connect();
        const { rows } = await client.query(`SELECT id, name from ${this.tableName} ORDER BY id`);
        await client.end();
        return rows;
    }
    getSingle = async (id) => {
        const client = this.getClient();
        await client.connect();
        const { rows } = await client.query(`SELECT id, name from ${this.tableName} WHERE id = ($1);`, [id]);
        await client.end();
        return rows[0];
    }
    post = async (data) => {
        const client = this.getClient();
        await client.connect();
        const res = await client.query(`INSERT INTO ${this.tableName} (name) VALUES ($1) RETURNING *`, [data.name]);
        await client.end();
        return res;
    }
    put = async (id, data) => {
        const client = this.getClient();
        await client.connect();
        const res = await client.query(`UPDATE ${this.tableName} SET name=($2) WHERE id=($1) RETURNING *`, [data.id, data.name]);
        await client.end();
        return res;
    }
    delete = async (id) => {
        const client = this.getClient();
        await client.connect();
        const res = await client.query(`DELETE FROM ${this.tableName} WHERE id=($1) RETURNING *`, [id]);
        await client.end();
        return res;
    }
}

module.exports = CrudSql;