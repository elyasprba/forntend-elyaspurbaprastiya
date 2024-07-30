import { useQuery } from "react-query";
import api from "../utils/api";
import { Pelabuhan } from "../types";

const useGetPelabuhanList = (countryId: number | null) =>
  useQuery({
    queryKey: ["pelabuhan-list", countryId],
    queryFn: async () => {
      if (!countryId) return [];

      const { data } = await api.get<Pelabuhan[]>(
        encodeURI(`/pelabuhans?filter={"where":{"id_negara":${countryId}}}`)
      );

      return data;
    },
  });

export default useGetPelabuhanList;
