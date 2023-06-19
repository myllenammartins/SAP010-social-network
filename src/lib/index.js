import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  fetchSignInMethodsForEmail,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth, app } from './firebase.js';

// CRIAR USUÁRIO
export const loginCreate = async (email, password, name) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
  } catch (error) {
    throw new Error('Ocorreu um erro ao criar o usuário, tente novamente.');
  }
};

// LOGAR COM USUÁRIO EXISTENTE
export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error('Ocorreu um erro. E-mail ou senha não correspondem com o cadastro, tente novamente.');
  }
};

export const emailDuplicate = async (email) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods.length > 0;
  } catch (error) {
    throw new Error('Ocorreu um erro ao verificar o e-mail cadastrado.');
  }
};

// LOGAR COM CONTA GOOGLE
export const loginGoogle = async () => {
  try {
    const authInstance = getAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(authInstance, provider);
  } catch (error) {
    throw new Error('Ocorreu um erro ao utilizar o login Google, tente novamente.');
  }
};

// LOGAR COM CONTA GITHUB
export const loginGithub = async () => {
  try {
    const authInstance = getAuth();
    const provider = new GithubAuthProvider();
    return signInWithPopup(authInstance, provider);
  } catch (error) {
    throw new Error('Ocorreu um erro ao utilizar o login GitHub, tente novamente.');
  }
};

// FUNÇÃO PARA USUÁRIO SAIR DO SITE (??? try/catch)
export function userStateLogout() {
  const authLogOut = getAuth();
  signOut(authLogOut);
}

// MANTER USUÁRIO LOGADO (https://firebase.google.com/docs/auth/web/manage-users?hl=pt-br)

export function userAuthChanged(callback) {
  try {
    const authLogin = getAuth(app);
    onAuthStateChanged(authLogin, callback);
  } catch (error) {
    // eslint-disable-next-line
    console.log('Erro ao verificar o estado de autenticação:', err);
  }
}
