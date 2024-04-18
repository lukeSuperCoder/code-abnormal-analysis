import { Service } from "../plugins/axios";

/**
 * 登录接口(示例)
 * @param params
 */
export function systemLogin(params) {
  return Service({
    url: "/api/login",
    method: "post",
    data: params,
  });
}

