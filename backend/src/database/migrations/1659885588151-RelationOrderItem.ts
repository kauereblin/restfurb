import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationOrderItem1659885588151 implements MigrationInterface {
    name = 'RelationOrderItem1659885588151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "phone" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "items" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "price" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "userId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "orders_items_relation" (
                "order_id" integer NOT NULL,
                "item_id" integer NOT NULL,
                PRIMARY KEY ("order_id", "item_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c2d68b7cdba0320ae79a8386cc" ON "orders_items_relation" ("order_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_280e3e64cb78e4f5684bb76643" ON "orders_items_relation" ("item_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_orders" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_orders"("id", "userId")
            SELECT "id",
                "userId"
            FROM "orders"
        `);
        await queryRunner.query(`
            DROP TABLE "orders"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_orders"
                RENAME TO "orders"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_c2d68b7cdba0320ae79a8386cc"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_280e3e64cb78e4f5684bb76643"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_orders_items_relation" (
                "order_id" integer NOT NULL,
                "item_id" integer NOT NULL,
                CONSTRAINT "FK_c2d68b7cdba0320ae79a8386ccb" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_280e3e64cb78e4f5684bb76643e" FOREIGN KEY ("item_id") REFERENCES "items" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("order_id", "item_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_orders_items_relation"("order_id", "item_id")
            SELECT "order_id",
                "item_id"
            FROM "orders_items_relation"
        `);
        await queryRunner.query(`
            DROP TABLE "orders_items_relation"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_orders_items_relation"
                RENAME TO "orders_items_relation"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c2d68b7cdba0320ae79a8386cc" ON "orders_items_relation" ("order_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_280e3e64cb78e4f5684bb76643" ON "orders_items_relation" ("item_id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_280e3e64cb78e4f5684bb76643"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_c2d68b7cdba0320ae79a8386cc"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders_items_relation"
                RENAME TO "temporary_orders_items_relation"
        `);
        await queryRunner.query(`
            CREATE TABLE "orders_items_relation" (
                "order_id" integer NOT NULL,
                "item_id" integer NOT NULL,
                PRIMARY KEY ("order_id", "item_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "orders_items_relation"("order_id", "item_id")
            SELECT "order_id",
                "item_id"
            FROM "temporary_orders_items_relation"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_orders_items_relation"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_280e3e64cb78e4f5684bb76643" ON "orders_items_relation" ("item_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c2d68b7cdba0320ae79a8386cc" ON "orders_items_relation" ("order_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
                RENAME TO "temporary_orders"
        `);
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "userId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "orders"("id", "userId")
            SELECT "id",
                "userId"
            FROM "temporary_orders"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_orders"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_280e3e64cb78e4f5684bb76643"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_c2d68b7cdba0320ae79a8386cc"
        `);
        await queryRunner.query(`
            DROP TABLE "orders_items_relation"
        `);
        await queryRunner.query(`
            DROP TABLE "orders"
        `);
        await queryRunner.query(`
            DROP TABLE "items"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
