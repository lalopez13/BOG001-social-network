import MockFirebase from '../_mocks_/firebase-mock.js';

import { signInUsers, createUsers, userSignOff } from '../src/components/auth.js';

global.firebase = MockFirebase();

describe('createUsers', () => {
  it('debería ser una función', () => {
    expect(typeof createUsers).toBe('function');
  });
  describe('Crear nuevos usuarios', () => {
    it('Deberia crear un nuevo usuario', () => createUsers('soulMates@gmail.com', '1234567')
      .then((user) => {
        expect(user.email).toBe('soulMates@gmail.com');
      }));
  });
});

describe('signInUsers', () => {
  it('debería ser una función', () => {
    expect(typeof signInUsers).toBe('function');
  });
  describe('Incio de sesion con autenticacion', () => {
    it('Deberia iniciar sesion con cuenta creada', () => signInUsers('soulMates@gmail.com', '1234567')
      .then((user) => {
        expect(user.email).toBe('soulMates@gmail.com');
      }));
  });
});
describe('signOut', () => {
  it('debería ser una función', () => {
    expect(typeof userSignOff).toBe('function');
  });
  describe('cerrar sesion', () => {
    it('deberia cerrar sesion', () => userSignOff()
      .then((user) => {
        expect(user).toBe('salir');
      }));
  });
});
