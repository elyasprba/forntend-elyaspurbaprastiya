import { useQuery } from "react-query";
import api from "../utils/api";
import { Barang } from "../types";

const useGetBarangList = (pelabuhanId: string | null) =>
  useQuery({
    queryKey: ["barang-list", pelabuhanId],
    queryFn: async () => {
      if (!pelabuhanId) return [];

      const { data } = await api.get<Barang[]>(
        encodeURI(`/barangs?filter={"where":{"id_pelabuhan":${pelabuhanId}}}`)
      );

      return data;
    },
  });

export default useGetBarangList;
