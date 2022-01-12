import request from "supertest";
import app from "../src/app";
import mongoose from 'mongoose';
import AdnModel from '../src/models/adn.model';

mongoose.connect('mongodb://localhost:27017/mutations');

describe("Testing mutation api", () => {
  beforeAll(async () => {
    await AdnModel.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("POST api/mutation", () => {
    
    // Invalid data adn
    describe("Invalid data adn", () => {
      test("should respond with a 500 status code", async () => {
        const newMutationInvalid = {
          dna: [
            "ATGCGA",
            "CAGTGC",
            "TTATGT",
            "AGAAGG",
            "CKCCTA",
            "TCACTG"
          ]
        };

        const response = await request(app).post('/api/mutation').send(newMutationInvalid);
        expect(response.statusCode).toBe(500);
      });
    });

    // verify horizontal mutation
    describe("Verify horizontal mutation", () => {
      test("should respond with a 200 status code", async () => {
        const newMutationHorizontal = {
          dna: [
            "ATGCGA",
            "CAGTGC",
            "TTATAT",
            "AGAAGG",
            "CCCCTA",
            "TCACTG"
          ]
        };

        const response = await request(app).post('/api/mutation').send(newMutationHorizontal);
        expect(response.statusCode).toBe(200);
      });
    });

    // verify vertical mutation
    describe("Verify vertical mutation", () => {
      test("should respond with a 200 status code", async () => {
        const newMutationVertical = {
          dna: [
            "ATGCGA",
            "CAGTGC",
            "TTATGT",
            "AGAAGG",
            "CACCTA",
            "TCACTG"
          ]
        };

        const response = await request(app).post('/api/mutation').send(newMutationVertical);
        expect(response.statusCode).toBe(200);
      });
    });

    // No has mutation
    describe("No has mutation", () => {
      test("should respond with a 403 status code", async () => {
        const newMutationVertical = {
          dna: [
            "ATGCGA",
            "CAGTGC",
            "TTATCT",
            "AGAAGG",
            "CACCTA",
            "TCACTG"
          ]
        };

        const response = await request(app).post('/api/mutation').send(newMutationVertical);
        expect(response.statusCode).toBe(403);
      });
    });
  });

  describe("GET api/stats", () => {
    // should respond with a 200 code
    test("shoud respond with a 200 status code", async () => {
      const response = await request(app).get("/api/stats").send();
        expect(response.statusCode).toBe(200);
    });
  });

});
