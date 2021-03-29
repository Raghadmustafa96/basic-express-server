'use strict';

const app = require('../src/server');
const req = app.superTest(app.app);

describe('Validator Test', () => {
  it('should the status be 500 if no name in the query string', async () => {
    const res = await req.get('/person');
    expect(res.status).toEqual(500);
  });

  it('should the status be 200 if  the name is in the query string', async () => {
    const res = await req.get('/person?name=raghad');
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual('raghad');
  });
});