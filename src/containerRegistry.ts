import { container } from 'tsyringe';
import { HttpClient } from '@/repositories/apis/httpClient';

// TODO: 素直に container.register() で書いたほうがわかりやすい。次にcontainer定義を追加するタイミングで削除する
// const register = <T>(
//   useClass: constructor<T>,
//   overrideClass?: constructor<T>
// ): void => {
//   container.register<T>(useClass.name, {
//     useClass: overrideClass ? overrideClass : useClass,
//   });
// };
//
// register(HttpClient);

export const TOKEN_NAME = {
  HttpClient: HttpClient.name,
};

container.register(TOKEN_NAME.HttpClient, {
  useClass: HttpClient,
});

export { container };
