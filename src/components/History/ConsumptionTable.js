

import React, { useState, useEffect, useRef } from "react";

import { Card, Table,  CardHeader } from "reactstrap";

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
               <CardHeader style={{ textAlign: "center" }} >Consumed Gallons</CardHeader> 
                <Table hover variant="dark" className={styles.table}>
                    <thead className={styles.tableRowHeader}>
                        <tr>
                            <th className={styles.tableHeader}>Employee Name</th>
                            <th className={styles.tableHeader}>Company</th>
                            <th className={styles.tableHeader}>Department</th>
                            <th className={styles.tableHeader}>Category</th>
                            <th className={styles.tableHeader}>Gallons</th>
                            <th className={styles.tableHeader}>Date</th>
                         
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
                                        {item.comp_name}
                                    </td>
                                    <td className={styles.tableCell}>
                                        {item.d_name}
                                    </td>
                                    <td className={styles.tableCell}>
                                        {item. cat_name}
                                    </td>
                                    <td className={styles.tableCell}>
                                        {item. consumed_quota}
                                    </td>
                                    <td className={styles.tableCell}>
                                        {new Date(item.rec_date).toISOString().slice(0, 10)}
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
