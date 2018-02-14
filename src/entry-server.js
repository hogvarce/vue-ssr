import createApp from './main';

export default context => new Promise((resolve, reject) => {
  const { app, router } = createApp();

  // устанавливаем маршрут для маршрутизатора серверной части
  router.push(context.url);

  // ожидаем, пока маршрутизатор разрешит возможные асинхронные компоненты и хуки
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    // нет подходящих маршрутов, отклоняем с 404
    if (!matchedComponents.length) {
      return reject({ code: 404 });
    }

    // Promise должен разрешиться экземпляром приложения, который будет отрендерен
    return resolve(app);
  }, reject);
});
