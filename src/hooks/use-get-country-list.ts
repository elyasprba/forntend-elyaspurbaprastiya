import { useQuery } from "react-query";
import api from "../utils/api";
import { Country } from "../types";

const useGetCountryList = () =>
  useQuery({
    queryKey: ["country-list"],
    queryFn: async () => {
      const { data } = await api.get<Country[]>("/negaras");
      return data;
    },
  });

export default useGetCountryList;
