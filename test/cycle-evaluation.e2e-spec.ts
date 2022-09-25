import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { V1Module } from '@/v1/v1.module';

describe('Cycle Evaluation /cycle-evaluation (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('should return ok response (POST)', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/cycle-evaluation')
      .send({
        input: {
          list1: [1, 2, 3],
          list2: [0, 2, 5],
          list3: [3, 0, 1, 2],
          list4: [4, 0, 3, 1, 2],
          list5: [5, 4, 0, 2, 3, 1],
          listn: [],
        },
      });
    expect(status).toBe(HttpStatus.OK);
    expect(body).toMatchObject({
      list1: false,
      list2: false,
      list3: true,
      list4: true,
      list5: true,
      listn: true,
    });
  });

  it('should return validation error response (POST)', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/cycle-evaluation')
      .set('Content-Type', 'application/json')
      .send({});

    console.info(status, body);
    expect(status).toBe(HttpStatus.BAD_REQUEST);
    expect(body.message).toEqual([
      'input should not be null or undefined',
      'input should not be empty',
    ]);
  });
});
