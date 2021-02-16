import request from 'supertest';
import { app } from '../../index';

it('returns 201 on successfull signup', async(done)=>{
    request(app)
        .post('/api/users/auth/signup')
        .send({
            email : 'test@test.com',
            password: 'password'
        })
        .expect(201)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.message).toBe('success');
            return done();
        });
});
it('check if cookies are set in successful signup response', async()=>{
    const resp = await request(app)
        .post('/api/users/auth/signup')
        .send({
            email : 'test@test.com',
            password: 'password'
        });
    expect( resp.get('Set-Cookie') ).toBeDefined();
});

// it('disallows duplicate emails', async(done)=>{
//     await request(app)
//         .post('/api/users/auth/signup')
//         .send({
//             email : 'test@test.com',
//             password: 'password'
//         })
//         .expect(201);
//     request(app)
//         .post('/api/users/auth/signup')
//         .send({
//             email : 'test@test.com',
//             password: 'password'
//         })
//         .expect(400)
//         .end((err, res) => {
//             if (err) {
//                 return done(err);
//             }
//             const validationMsg = [ { message: 'Email already in use' } ];
//             expect(res.body).toStrictEqual(validationMsg);
//             return done();
//         });
// });

it('returns 400 and error messages when request body validation fails', async()=>{
    const validationErrMsg = [
        {
          value: 'test',
          msg: 'Email must be valid',
          param: 'email',
          location: 'body'
        },
        {
          value: 'pad',
          msg: 'Password must be min 4 and max 20 chars',
          param: 'password',
          location: 'body'
        }
      ];
    const resp = await request(app)
        .post('/api/users/auth/signup')
        .send({
            email : 'test',
            password: 'pad'
        });
    expect(resp.body.errors).toHaveLength(2);
    expect(resp.status).toBe(400);
    expect(resp.body.errors).toStrictEqual(validationErrMsg);
});