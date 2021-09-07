import React, { Fragment, useState } from 'react'
import { Button, Row, Col, Form, FormGroup, Label, Input, Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import Plot from 'react-plotly.js';
import classnames from 'classnames';

function TableView() {
    
    const state = useSelector(state => state.csv)
    const [headers, setHeader] = useState(state.header)
    const [rows, setRows] = useState(state.rows)
    const [clickCount, setClickCount] = useState(0)
    const [activeTab, setActiveTab] = useState('1');
    const [x, setx] = useState([]);
    const [y, sety] = useState([]);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const resetCounter = () => {
        setClickCount(0)
    }

    const exportCsv = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        let head = ''
        headers.forEach(function (rowArray,i) {
            if(headers.length == i+1){
                head += rowArray
            }else{
                head += rowArray+','
            }
            // let row = headers.split(",");
            // csvContent += row + "\r\n";           
            // csvContent += rowArray ;           
        });
        csvContent += head ;
        rows.forEach(function (rowArray) {
            // let row = rowArray.join(",");
            // csvContent += row + "\r\n";           
            csvContent += rowArray ;           
        });
        
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF
        link.click();

    }
    let counter = 0;

    const columnNumber = (e, index) => {
        counter++;
        setClickCount(clickCount + 1)
        if (clickCount == 0) {
        let xData = []
            rows.map(res => {
                let row = res.split(',')
                xData.push(row[index])
            })
            setx(xData)
        }
        if (clickCount == 1) {
        let yData = []
            rows.map(res => {
                let row = res.split(',')
                yData.push(row[index])
            })
            sety(yData)
        }
        // if()
    }
    return (
        <div className="csv_table">
            {clickCount == 0 ? <p style={{ textAlign: 'center' }}>Please Select at least 2 columns</p>
                :clickCount == 2&&<p style={{ textAlign: 'center' }}>If you want to change the column Please click Reset Button </p>}
            <h3>CSV Table</h3>
            <button className="btn btn-default" onClick={resetCounter}>Reset</button>
            <button className="btn btn-primary" onClick={exportCsv}>Export to csv</button>
             <Table bordered>
                <thead>
                    <tr>
                        {
                            headers?.length > 0 && headers?.map((res,i) => {
                                return <th onClick={(e)=>columnNumber(e,i)}>{res}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rows?.length > 0 && rows?.map(res => {
                            let row = res.split(',')
                            return (<tr >
                                {row?.length > 0 && row?.map((data,i) => {
                                    return <td onClick={(e)=>columnNumber(e,i)}>{data}</td>
                                })}
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
            <div className="graph">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Scatter
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Box
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            Histogram
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <Plot
                                    data={[
                                        {
                                            x: x,
                                            y: y,
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            marker: { color: 'red' },
                                        },
                                        { type: 'bar', x: x, y: y },
                                    ]}
                                    layout={{ width: 800, height: 450, title: 'A Scatter Plot' }}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <Plot
                                    data={[
                                        {
                                            x: x,
                                            y: y,
                                            type: 'box',
                                            mode: 'lines+markers',
                                            marker: { color: 'red' },
                                        },
                                        { type: 'bar', x: x, y: y },
                                    ]}
                                    layout={{ width: 800, height: 450, title: 'A Box Plot' }}
                                />
                            </Col>

                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <Plot
                                    data={[
                                        {
                                            x: x,
                                            y: y,
                                            type: 'histogram',
                                            mode: 'lines+markers',
                                            marker: { color: 'red' },
                                        },
                                        { type: 'bar', x: x, y: y },
                                    ]}
                                    layout={{ width: 800, height: 450, title: 'A Histogram Plot' }}
                                />
                            </Col>

                        </Row>
                    </TabPane>
                </TabContent>

            </div>
        </div>
    )
}

export default TableView
