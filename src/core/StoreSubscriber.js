import {isEqual} from "@core/utils";

export class StoreSubscriber {
  constructor(state) {
    this.state = state;
    this.sub = null;
    this.prevState = {};
  }

  subscribeComponents(components) {
    this.prevState = this.state.getState();

    this.sub = this.state.subscribe((state) => {
      Object.keys(state).forEach(key => {
        if(!isEqual(state[key], this.prevState[key])) {
          components.forEach(component => {
            if(component.isWatching(key)) {
              const changes = {[key]: state[key]}
              component.storeChanged(changes);
            }
          })
        }
      })
      this.prevState = this.state.getState();
    });
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe();
  }
}