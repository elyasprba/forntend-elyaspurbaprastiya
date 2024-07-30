import { useState } from "react";
import Select from "react-select";

import useGetCountryList from "./hooks/use-get-country-list";
import useGetPelabuhanList from "./hooks/use-get-pelabuhan-list";
import useGetBarangList from "./hooks/use-get-barang-list";

import "./App.css";
import {
  FormContainer,
  Header,
  Input,
  Label,
  Section,
  Textarea,
} from "./styles/selection-style";

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
    <FormContainer>
      <Header>Test Frontend PT. Aman Tekno Solusi</Header>

      <Section>
        <Label>Negara</Label>
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
      </Section>

      <Section>
        <Label>Pelabuhan</Label>
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
      </Section>

      <Section>
        <Label>Barang</Label>
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
      </Section>

      <Section>
        <Label>Deskripsi</Label>
        <Textarea
          className="textarea"
          value={selectedBarang?.description ?? ""}
          disabled
        />
      </Section>

      <Section>
        <Label>Diskon %</Label>
        <Input
          className="input"
          type="text"
          value={selectedBarang?.diskon ?? ""}
          disabled
        />
      </Section>

      <Section>
        <Label>Harga</Label>
        <Input
          className="input"
          type="text"
          value={selectedBarang?.harga ?? ""}
          disabled
        />
      </Section>

      <Section>
        <Label>Total</Label>
        <Input
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
          disabled
        />
      </Section>
    </FormContainer>
  );
}

export default App;
