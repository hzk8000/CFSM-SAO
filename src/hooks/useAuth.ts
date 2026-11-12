import { useQuery } from "@tanstack/react-query";
import { getInitialAuth, getMe } from "@/services/api";

export function useAuth() {
  return useQuery({
    queryKey: ["me"],
    queryFn: ({ signal }) => getMe({ signal }),
    initialData: getInitialAuth,
    // token 只用于同步显示；Access 会通过 Cookie 授权且没有面板 JWT，
    // 因此首屏数据必须立即向 /api/config 复核一次。
    initialDataUpdatedAt: 0,
    staleTime: 30_000,
    // 后台在新标签页登录后，返回时必须立即校验。
    refetchOnWindowFocus: "always",
  });
}

