
import React, { useEffect, useState } from "react";
import { Loading } from "../LoadingComponent"
import ConsumptionTable from './ConsumptionTable'
import { subtractDays, todayDate, currenDate } from '../../shared/constVal'
import { Label, Col, Input, Row, Card } from "reactstrap";
import Select from "react-select";
const Consumption = ({ ...props }) => {
     let minusDays = new Date(todayDate).getDay()
     const [startDate, setStart] = useState(subtractDays(minusDays, todayDate))
     const [endDate, setEnd] = useState(todayDate)
     const [selectedOption, setSelectedOption] = useState(0);
     if (props.isLoading || props.isLoadingEmp)
          return <Loading />
     else if (props.errMess)
          return <h4>{props.errMess}</h4>;
     else if (props.errMessEmp)
          return <h4>{props.errMessEmp}</h4>;
     else {
          let item = props.viewDones.filter((d) =>
               new Date(new Date(d.rec_date).toISOString().slice(0, 10)) >= new Date(startDate)
               && new Date(new Date(d.rec_date).toISOString().slice(0, 10)) <= new Date(endDate))

          if (selectedOption.value) {
               item = item.filter((d) => d.emp_id == selectedOption.value)
          }
          return <div className="container" style={{ marginTop: '2px' }}>
               <Card style={{marginBottom:10}}>
                    <Row style={{ padding: "10px 10px 10px 10px" }}>
                         <Col md={6}>
                              <Row>
                                   <Label md={3}>From Date:</Label>
                                   <Col md={9}>
                                        <Input value={startDate} type="date" name="start" onChange={(e) => {
                                             setStart(e.target.value)
                                        }} />
                                   </Col>
                              </Row>
                         </Col>
                         <Col md={6}>
                              <Row>
                                   <Label md={3}>To Date:</Label>
                                   <Col md={9}>
                                        <Input value={endDate} type="date" name="end" onChange={(e) => {
                                             setEnd(e.target.value)
                                        }} />
                                   </Col>
                              </Row>
                         </Col>
                         <Col md={6}>
                              <Row style={{ marginTop: '10px' }}>

                                   <Label md={3}>Employee:</Label>
                                   <Col md={9}>

                                        <Select
                                             placeholder="Select Employee"
                                             value={selectedOption}
                                             onChange={setSelectedOption}
                                             options={[
                                                  { value: 0, label: "Select All" },
                                                  ...props.employees.map((e) => ({
                                                       value: e.emp_id,
                                                       label: e.emp_name,
                                                  })),
                                             ]}
                                        />
                                   </Col>
                              </Row>
                         </Col>
                    </Row>
               </Card>


               <ConsumptionTable item={item} />
          </div>
     }
}
export default   Consumption