import React, { useEffect } from "react";

import styles from "./TableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className={styles.tableFooter}>
      <div style={{ margin: "2px" }}>
        {range.map((el, index) => (
          <button
            key={index}
            style={{ marginTop: "2px" }}
            className={`${styles.button} ${
              page === el ? styles.activeButton : styles.inactiveButton
            }`}
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableFooter;
