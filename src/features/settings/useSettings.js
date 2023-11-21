import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    status,
    error,
    data: settings,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });
  return { isLoading, status, error, settings };
}
