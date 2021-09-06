/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const chai = require('chai');
const { expect } = require('chai');
const { AppModule } = require('../../dist/app.module');
const { Test } = require('@nestjs/testing');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Testing all tasks', async () => {
  let app;

  before(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();

    // load data is nessesary
    const prep = await chai
      .request(app.getHttpServer())
      .get('/people/direct/20');
    if (prep.statusCode != 200) {
      await chai.request(app.getHttpServer()).post('/people/all');
    }
  });

  after(async () => {
    await app.close();
  });

  it('should return home page', async () => {
    const res = await chai.request(app.getHttpServer()).get('/');
    chai.expect(res.text).to.not.equal(null);
  });

  it('GET I task', async () => {
    const res = await chai
      .request(app.getHttpServer())
      .get('/people/direct/20');
    expect(res.statusCode).to.equal(200);
    expect(res.body.length).to.equal(7);
  });

  it('GET II task', async () => {
    const res = await chai
      .request(app.getHttpServer())
      .get('/people/friends/20');
    expect(res.statusCode).to.equal(200);
    expect(res.body.length).to.equal(7);
  });

  it('GET III task', async () => {
    const res = await chai
      .request(app.getHttpServer())
      .get('/people/suggested/20');
    expect(res.statusCode).to.equal(200);
    expect(res.body.length).to.equal(2);
    expect(res.body[0].id).to.equal(5);
    expect(res.body[1].id).to.equal(18);
  });
});
