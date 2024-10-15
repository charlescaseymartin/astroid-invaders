import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuid } from 'uuid';

export class Init1728984122579 implements MigrationInterface {
    name = 'Init1728984122579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pilot" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(150) NOT NULL, "skin" text NOT NULL, "speed" integer NOT NULL, "attack" integer NOT NULL, "defence" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "enemy" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(150) NOT NULL, "skin" text NOT NULL, "speed" integer NOT NULL, "attack" integer NOT NULL, "defence" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "crew" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(150), "score" integer NOT NULL, "dateCreated" datetime DEFAULT (datetime('now')), "playerOneId" varchar, CONSTRAINT "REL_327d8f435308c24ece4577f554" UNIQUE ("playerOneId"))`);
        await queryRunner.query(`CREATE TABLE "player" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(150), "score" integer NOT NULL, "crewId" varchar, "dateCreated" datetime DEFAULT (datetime('now')), "pilotId" varchar, CONSTRAINT "REL_4a17c62f50d53adaca697934f5" UNIQUE ("pilotId"))`);
        await queryRunner.query(`CREATE TABLE "player_leaderboard" ("id" integer PRIMARY KEY NOT NULL, "playerId" varchar, CONSTRAINT "REL_9a77a925e819ede297a1e2fbaf" UNIQUE ("playerId"))`);
        await queryRunner.query(`CREATE TABLE "crew_leaderboard" ("id" integer PRIMARY KEY NOT NULL, "crewId" varchar, CONSTRAINT "REL_f33c0766726acb3f2f22a74589" UNIQUE ("crewId"))`);
        await queryRunner.query(`CREATE TABLE "temporary_crew" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(150), "score" integer NOT NULL, "dateCreated" datetime DEFAULT (datetime('now')), "playerOneId" varchar, CONSTRAINT "REL_327d8f435308c24ece4577f554" UNIQUE ("playerOneId"), CONSTRAINT "FK_327d8f435308c24ece4577f5547" FOREIGN KEY ("playerOneId") REFERENCES "player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_crew"("id", "name", "score", "dateCreated", "playerOneId") SELECT "id", "name", "score", "dateCreated", "playerOneId" FROM "crew"`);
        await queryRunner.query(`DROP TABLE "crew"`);
        await queryRunner.query(`ALTER TABLE "temporary_crew" RENAME TO "crew"`);
        await queryRunner.query(`CREATE TABLE "temporary_player" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(150), "score" integer NOT NULL, "crewId" varchar, "dateCreated" datetime DEFAULT (datetime('now')), "pilotId" varchar, CONSTRAINT "REL_4a17c62f50d53adaca697934f5" UNIQUE ("pilotId"), CONSTRAINT "FK_4a17c62f50d53adaca697934f50" FOREIGN KEY ("pilotId") REFERENCES "pilot" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c7376343836560c59adfcfbca9e" FOREIGN KEY ("crewId") REFERENCES "crew" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_player"("id", "name", "score", "crewId", "dateCreated", "pilotId") SELECT "id", "name", "score", "crewId", "dateCreated", "pilotId" FROM "player"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`ALTER TABLE "temporary_player" RENAME TO "player"`);
        await queryRunner.query(`CREATE TABLE "temporary_player_leaderboard" ("id" integer PRIMARY KEY NOT NULL, "playerId" varchar, CONSTRAINT "REL_9a77a925e819ede297a1e2fbaf" UNIQUE ("playerId"), CONSTRAINT "FK_9a77a925e819ede297a1e2fbaf1" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_player_leaderboard"("id", "playerId") SELECT "id", "playerId" FROM "player_leaderboard"`);
        await queryRunner.query(`DROP TABLE "player_leaderboard"`);
        await queryRunner.query(`ALTER TABLE "temporary_player_leaderboard" RENAME TO "player_leaderboard"`);
        await queryRunner.query(`CREATE TABLE "temporary_crew_leaderboard" ("id" integer PRIMARY KEY NOT NULL, "crewId" varchar, CONSTRAINT "REL_f33c0766726acb3f2f22a74589" UNIQUE ("crewId"), CONSTRAINT "FK_f33c0766726acb3f2f22a745896" FOREIGN KEY ("crewId") REFERENCES "crew" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_crew_leaderboard"("id", "crewId") SELECT "id", "crewId" FROM "crew_leaderboard"`);
        await queryRunner.query(`DROP TABLE "crew_leaderboard"`);
        await queryRunner.query(`ALTER TABLE "temporary_crew_leaderboard" RENAME TO "crew_leaderboard"`);

        // insert initial data
        await queryRunner.query(`INSERT INTO pilot ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "pilot-1", "./test/skin/path", 23, 32, 47);`);
        await queryRunner.query(`INSERT INTO pilot ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "pilot-2", "./test/skin/path", 23, 32, 47);`);
        await queryRunner.query(`INSERT INTO pilot ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "pilot-3", "./test/skin/path", 23, 32, 47);`);
        await queryRunner.query(`INSERT INTO pilot ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "pilot-4", "./test/skin/path", 23, 32, 47);`);
        await queryRunner.query(`INSERT INTO pilot ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "pilot-5", "./test/skin/path", 23, 32, 47);`);
        await queryRunner.query(`INSERT INTO pilot ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "pilot-6", "./test/skin/path", 23, 32, 47);`);
        await queryRunner.query(`INSERT INTO pilot ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "pilot-7", "./test/skin/path", 23, 32, 47);`);
        await queryRunner.query(`INSERT INTO pilot ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "pilot-8", "./test/skin/path", 23, 32, 47);`);
        await queryRunner.query(`INSERT INTO enemy ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "enemy-1", "./test/skin/path", 2, 3, 4);`);
        await queryRunner.query(`INSERT INTO enemy ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "enemy-2", "./test/skin/path", 2, 3, 4);`);
        await queryRunner.query(`INSERT INTO enemy ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "enemy-3", "./test/skin/path", 2, 3, 4);`);
        await queryRunner.query(`INSERT INTO enemy ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "enemy-4", "./test/skin/path", 2, 3, 4);`);
        await queryRunner.query(`INSERT INTO enemy ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "enemy-5", "./test/skin/path", 2, 3, 4);`);
        await queryRunner.query(`INSERT INTO enemy ("id", "name", "skin", "speed", "attack", "defence") VALUES ("${uuid()}", "enemy-6", "./test/skin/path", 2, 3, 4);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crew_leaderboard" RENAME TO "temporary_crew_leaderboard"`);
        await queryRunner.query(`CREATE TABLE "crew_leaderboard" ("id" integer PRIMARY KEY NOT NULL, "crewId" varchar, CONSTRAINT "REL_f33c0766726acb3f2f22a74589" UNIQUE ("crewId"))`);
        await queryRunner.query(`INSERT INTO "crew_leaderboard"("id", "crewId") SELECT "id", "crewId" FROM "temporary_crew_leaderboard"`);
        await queryRunner.query(`DROP TABLE "temporary_crew_leaderboard"`);
        await queryRunner.query(`ALTER TABLE "player_leaderboard" RENAME TO "temporary_player_leaderboard"`);
        await queryRunner.query(`CREATE TABLE "player_leaderboard" ("id" integer PRIMARY KEY NOT NULL, "playerId" varchar, CONSTRAINT "REL_9a77a925e819ede297a1e2fbaf" UNIQUE ("playerId"))`);
        await queryRunner.query(`INSERT INTO "player_leaderboard"("id", "playerId") SELECT "id", "playerId" FROM "temporary_player_leaderboard"`);
        await queryRunner.query(`DROP TABLE "temporary_player_leaderboard"`);
        await queryRunner.query(`ALTER TABLE "player" RENAME TO "temporary_player"`);
        await queryRunner.query(`CREATE TABLE "player" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(150) NOT NULL, "score" integer NOT NULL, "crewId" varchar NOT NULL, "dateCreated" datetime NOT NULL DEFAULT (datetime('now')), "pilotId" varchar, CONSTRAINT "REL_4a17c62f50d53adaca697934f5" UNIQUE ("pilotId"))`);
        await queryRunner.query(`INSERT INTO "player"("id", "name", "score", "crewId", "dateCreated", "pilotId") SELECT "id", "name", "score", "crewId", "dateCreated", "pilotId" FROM "temporary_player"`);
        await queryRunner.query(`DROP TABLE "temporary_player"`);
        await queryRunner.query(`ALTER TABLE "crew" RENAME TO "temporary_crew"`);
        await queryRunner.query(`CREATE TABLE "crew" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(150) NOT NULL, "score" integer NOT NULL, "dateCreated" datetime NOT NULL DEFAULT (datetime('now')), "playerOneId" varchar, CONSTRAINT "REL_327d8f435308c24ece4577f554" UNIQUE ("playerOneId"))`);
        await queryRunner.query(`INSERT INTO "crew"("id", "name", "score", "dateCreated", "playerOneId") SELECT "id", "name", "score", "dateCreated", "playerOneId" FROM "temporary_crew"`);
        await queryRunner.query(`DROP TABLE "temporary_crew"`);
        await queryRunner.query(`DROP TABLE "crew_leaderboard"`);
        await queryRunner.query(`DROP TABLE "player_leaderboard"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "crew"`);
        await queryRunner.query(`DROP TABLE "enemy"`);
        await queryRunner.query(`DROP TABLE "pilot"`);
    }

}
