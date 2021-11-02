import { isEmpty } from "lodash";

import { StyleSheet } from "../../helpers/StyleSheet";

const SearchBar = ({ handleSearchButtonPress, searchTerm, setSearchTerm }) => {
  return (
    <div style={styles.container}>
      <input
        id="search_bar_input"
        style={styles.input}
        type="text"
        placeholder={"Ingrese nombre del Servidor o descripción del problema"}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchButtonPress(searchTerm);
          }
        }}
      />
      <button
        id="search_bar_button"
        style={styles.button}
        disabled={isEmpty(searchTerm)}
        onClick={() => handleSearchButtonPress(searchTerm)}
      >
        {"Buscar"}
      </button>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 10,
    display: "flex",
  },
  input: {
    height: 40,
    width: 350,
  },
  button: {
    width: 100,
    height: 46,
  },
});
export default SearchBar;
