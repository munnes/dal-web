

import React, { useState, useEffect, useRef } from "react";

import { Card, Table, CardHeader } from "reactstrap";

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "react-medium-image-zoom/dist/styles.css";
//*********************** */
import useTable from "../../shared/Page/useTable"
import styles from "../../shared/Page/Table.module.css";
import TableFooter from "../../shared/Page/tableFooter";

const ConsumptionTable = ({
    item,
}) => {
    const [page, setPage] = useState(1);
    let { slice, range } = useTable(item, page, 10);

    return (
        <>
            <Card>
                <CardHeader style={{ textAlign: "center" }} >Cars History</CardHeader>
                <Table hover variant="dark" className={styles.table}>
                    <thead className={styles.tableRowHeader}>
                        <tr>
                            <th className={styles.tableHeader}>Employee Name</th>
                            <th className={styles.tableHeader}>Car</th>
                            <th className={styles.tableHeader}>Start Date</th>
                            <th className={styles.tableHeader}>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slice.map((item) => {

                            return (
                                <tr
                                    key={item.rec_id}
                                    className={styles.tableRowItems}
                                >
                                    <td className={styles.tableCell}>
                                        {item.emp_name}
                                    </td>
                                    <td className={styles.tableCell}>
                                        {item.fuel === 1 ? item.b_name + '-' + item.plate + ' (Gasoline)' :
                                            item.b_name + '-' + item.plate + ' (Oil)'
                                        }
                                    </td>
                                  
                                    <td className={styles.tableCell}>
                                        {new Date(item.start).toISOString().slice(0, 10)}
                                    </td>
                                    <td className={styles.tableCell}>
                                        {item.end&&new Date(item.end).toISOString().slice(0, 10)}
                                    </td>


                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
            </Card>


        </>
    );
};
export default ConsumptionTable;
