import { Store } from 'vuex'
import { defineModule } from '~/store/helpers';
import { auth } from '~/plugins/firebase'
import * as sessionsStore from '~/store/sessions'
import * as proposalsStore from '~/store/proposals'

/**
 * Reflect Firebase auth state to Vuex.
 */
const listenAuthState = (store: Store<any>) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      store.commit('auth/setUser', user)
    } else {
      store.commit('auth/logout')
    }
  })
}

export const plugins = [listenAuthState]

export interface RootState {
  [sessionsStore.namespace]: sessionsStore.State
}

export const root = defineModule<RootState>()({
  modules: {
    [sessionsStore.namespace]: sessionsStore.sessionsModule,
    [proposalsStore.namespace]: proposalsStore.proposalsModule
  },
});
