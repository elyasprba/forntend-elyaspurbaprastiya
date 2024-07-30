import { useState } from "react";
import Select from "react-select";
import useGetCountryList from "./hooks/use-get-country-list";
import useGetPelabuhanList from "./hooks/use-get-pelabuhan-list";
import useGetBarangList from "./hooks/use-get-barang-list";
import "./App.css";

function App() {
  const [countryId, setCountryId] = useState<number | null>(null);
  const [pelabuhanId, setPelabuhanId] = useState<string | null>(null);
  const [barangId, setBarangId] = useState<number | null>(null);

  const { data: countries = [], isLoading: isCountryLoading } =
    useGetCountryList();
  const countryOptions = countries.map((country) => ({
    label: country.nama_negara,
    value: country.id_negara,
  }));

  const { data: pelabuhans = [], isLoading: isPelabuhanLoading } =
    useGetPelabuhanList(countryId);
  const pelabuhanOptions = pelabuhans.map((pelabuhan) => ({
    label: pelabuhan.nama_pelabuhan,
    value: pelabuhan.id_pelabuhan,
  }));
  const selectedPelabuhan = pelabuhanOptions.find(
    (option) => option.value === pelabuhanId
  );

  const { data: barangs = [], isLoading: isBarangLoading } = useGetBarangList(
    selectedPelabuhan?.value ?? null
  );
  const barangOptions = barangs.map((barang) => ({
    label: barang.nama_barang,
    value: barang.id_barang,
  }));
  const selectedBarangOption = barangOptions.find(
    (option) => option.value === barangId
  );
  const selectedBarang = barangs.find(
    (barang) => barang.id_barang === barangId
  );

  return (
    <form className="container">
      <div className="header">Selection Interface</div>

      <div className="section">
        <label className="label">Country</label>
        <Select
          isLoading={isCountryLoading}
          isSearchable
          options={countryOptions}
          onChange={(newValue) => {
            setCountryId(newValue?.value ?? null);
            setPelabuhanId(null);
            setBarangId(null);
          }}
          className="select"
        />
      </div>

      <div className="section">
        <label className="label">Pelabuhan</label>
        <Select
          isDisabled={!countryId}
          isLoading={isPelabuhanLoading}
          isSearchable
          value={selectedPelabuhan ?? null}
          options={pelabuhanOptions}
          onChange={(newValue) => {
            setPelabuhanId(newValue?.value ?? null);
            setBarangId(null);
          }}
          className="select"
        />
      </div>

      <div className="section">
        <label className="label">Barang</label>
        <Select
          isDisabled={!selectedPelabuhan}
          isLoading={isBarangLoading}
          isSearchable
          value={selectedBarangOption ?? null}
          options={barangOptions}
          onChange={(newValue) => {
            setBarangId(newValue?.value ?? null);
          }}
          className="select"
        />
      </div>

      <div className="section">
        <label className="label">Deskripsi</label>
        <textarea
          className="textarea"
          value={selectedBarang?.description ?? ""}
          readOnly
        />
      </div>

      <div className="section">
        <label className="label">Discount</label>
        <input
          className="input"
          type="text"
          value={selectedBarang?.diskon ?? ""}
          readOnly
        />
        %
      </div>

      <div className="section">
        <label className="label">Harga</label>
        <input
          className="input"
          type="text"
          value={selectedBarang?.harga ?? ""}
          readOnly
        />
      </div>

      <div className="section">
        <label className="label">Total</label>
        <input
          className="input"
          type="text"
          value={
            selectedBarang
              ? `Rp. ${(
                  ((100 - selectedBarang.diskon) / 100) *
                  selectedBarang.harga
                ).toLocaleString("id-ID")}`
              : ""
          }
          readOnly
        />
      </div>
    </form>
  );
}

export default App;
