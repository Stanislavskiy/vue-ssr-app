import { createApp } from "./main";

export default context =>
  new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    // Update router path
    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        /* eslint-disable */
        return reject({ url:context.url, code: 404 });
        /* eslint enable */
      }

      // Execute all components async data
      Promise.all(
        matchedComponents.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData({  
              store,
              route: router.currentRoute
            });
          }
        })).then(() => {
          // Will be serialized and injected into DOM as 'window.__INITIAL_STATE__'
          context.state = store.state;
          resolve(app);
        }).catch(reject);
    }, reject);
  });
