/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const chai = require('chai');
const app = require('../../dist/main');
const { AppModule } = require('../../dist/app.module');
const { Test } = require('@nestjs/testing');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Testing all tasks', async () => {
  let app;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET I task', async () => {
    const adding = await chai
      .request(app.getHttpServer())
      .post('/api/v1/people/all');
    console.log(adding.body);
    const res = await chai
      .request(app.getHttpServer())
      .get('/api/v1/people/direct/1');
    console.log(res.body);
  });

  it('GET II task', async () => {
    const adding = await chai
      .request(app.getHttpServer())
      .post('/api/v1/people/all');
    console.log(adding.body);
    const res = await chai
      .request(app.getHttpServer())
      .get('/api/v1/people/friends/1');
    console.log(res.body);
  });

  it('GET III task', async () => {
    const adding = await chai
      .request(app.getHttpServer())
      .post('/api/v1/people/all');
    console.log(adding.body);
    const res = await chai
      .request(app.getHttpServer())
      .get('/api/v1/people/suggested/1');
    console.log(res.body);
  });
});
