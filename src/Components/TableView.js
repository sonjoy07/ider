import React, { Fragment, useState } from 'react'
import { Button, Row, Col, Form, FormGroup, Label, Input, Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import Plot from 'react-plotly.js';
import classnames from 'classnames';

function TableView() {
    
    const state = useSelector(state => state.csv)
    const [headers, setHeader] = useState(state.header)
    const [rows, setRows] = useState(state.rows)
    console.log('asdfasdf',state)
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
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
        
        console.log('csvContent',csvContent)
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF
        link.click();

        // console.log('export', mainrow)
    }
    return (
        <div className="csv_table">
            <h3>CSV Table</h3>
            <button className="btn btn-primary" onClick={exportCsv}>Export to csv</button>
             <Table bordered>
                <thead>
                    <tr>
                        {
                            headers?.length > 0 && headers?.map(res => {
                                return <th>{res}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rows?.length > 0 && rows?.map(res => {
                            let row = res.split(',')
                            console.log('sonjoy', row)
                            return (<tr>
                                {row.length > 0 && row.map(data => {
                                    return <td>{data}</td>
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
                                            x: [1, 2, 3],
                                            y: [2, 6, 3],
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            marker: { color: 'red' },
                                        },
                                        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
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
                                            x: [1, 2, 3],
                                            y: [2, 6, 3],
                                            type: 'box',
                                            mode: 'lines+markers',
                                            marker: { color: 'red' },
                                        },
                                        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
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
                                            x: [1, 2, 3],
                                            y: [2, 6, 3],
                                            type: 'histogram',
                                            mode: 'lines+markers',
                                            marker: { color: 'red' },
                                        },
                                        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
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
