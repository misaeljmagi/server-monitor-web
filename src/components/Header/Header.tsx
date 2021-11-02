import React from "react";
import { StyleSheet } from "../../helpers/StyleSheet";

const Header = () => <div style={styles.header}>Monitor App</div>;

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    textAlign: "left",
    marginLeft: 20,
    padding: 10,
  },
});

export default Header;
