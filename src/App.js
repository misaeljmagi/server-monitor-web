import { useCallback, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { BoxLoading } from "react-loadingg";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import { StyleSheet } from "./helpers/StyleSheet";
import { getAlerts } from "./api/api";
import AlertGrid from "./components/AlertGrid/AlertGrid";

const PAGE_SIZE = 5;

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);

  const [alerts, setAlerts] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  const [totalCount, setTotalCount] = useState(0);

  const fetchAlerts = useCallback(async (term, params) => {
    setLoading(true);
    const { alerts: serverAlerts, count } = await getAlerts({
      searchTerm: term,
      params,
    });

    setTotalCount(count);
    setAlerts(serverAlerts);
    setLoading(false);
  }, []);

  useEffect(() => fetchAlerts(), [fetchAlerts]);

  const searchBarProps = {
    handleSearchButtonPress: fetchAlerts,
    searchTerm,
    setSearchTerm,
  };

  const onCurrentPageChange = useCallback(
    async (page) => {
      const skip =
        page + 1 > totalCount / PAGE_SIZE
          ? totalCount - (totalCount % PAGE_SIZE)
          : (page + 1) * PAGE_SIZE;

      await fetchAlerts(searchTerm, { skip });

      setCurrentPage(page);
    },
    [fetchAlerts, searchTerm, totalCount]
  );

  return (
    <div style={styles.app}>
      <Header />
      <SearchBar {...searchBarProps} />
      {isEmpty(alerts) && <div>No results found!</div>}
      {loading && <BoxLoading />}
      {!loading && !isEmpty(alerts) && (
        <AlertGrid
          alerts={alerts}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onCurrentPageChange={onCurrentPageChange}
          totalCount={totalCount}
        />
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: "#70b0ba",
  },
});

export default App;
